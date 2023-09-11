import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries';
import fs, { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = allPostsQuery();

    try {
      const data = await client.fetch(query);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json('There is error!');
    }
  } else if (req.method === 'POST') {
    // Get file from formidable
    const result: any = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm({ multiples: true });
      form.parse(req, async function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    }).catch((e) => {
      console.log(e);
      return res.status(400).json('Error parsing');
    });

    const {caption, topic, user_id} = result.fields;
    let videoAssetId = '';

    // Upload video file first
    try {
      if (result.files?.video) {
        const stream = fs.createReadStream(result.files.video.filepath);
        const fileBuffer = await stream2buffer(stream);
        const videoAsset = await client.assets.upload('file', fileBuffer, {
          filename: result.files.video.originalFilename,
        });
        videoAssetId = videoAsset._id;
        //return res.status(200).json({ videoAsset_id: videoAsset._id });
      }else {
        return res.status(400).json('No video file!');
      }
    } catch (err) {
      return res.status(400).json('Error uploading video file!');
    }

    // Create document
    const document = {
      _type: 'post',
      caption: caption,
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAssetId,
        },
      },
      userId: user_id,
      postedBy: {
        _type: 'postedBy',
        _ref: user_id,
      },
      topic: topic,
    };

    // Create video post
    try {
      await client.create(document);
      return res.status(200).json('Video post created!');
    } catch (err) {
      return res.status(400).json('Error creating video post!');
    }
  }
}

// Convert stream to buffer
async function stream2buffer(stream: fs.ReadStream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    stream.on('data', (chunk: any) => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', (err: any) => reject(`error converting stream - ${err}`));
  });
}

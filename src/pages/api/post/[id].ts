import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import { client } from '../../../utils/client';
import { postDetailQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {id} = req.query;
    const query = postDetailQuery(id as string | string[]);

    try {
      const data = await client.fetch(query);
      res.status(200).json(data[0]);
    } catch (err) {
      res.status(400).json('There is error!');
    }
  }  else if (req.method === 'PUT') {
    const { comment, userId } = req.body;

    const { id } = req.query;
    try {
      const data = await client
        .patch(id as string)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuid(),
            postedBy: { _type: 'postedBy', _ref: userId },
          },
        ])
        .commit();
        res.status(200).json(data);
    } catch (err) {
      res.status(400).json('There is error!');
    }
  }
}

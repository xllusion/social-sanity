// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const user = req.body;
    
    try {
      await client.createIfNotExists(user);
      res.status(200).json('Sanity login successfully');
    } catch (err) {
      res.status(405).json('Sanity login failed');
    }
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';

import { allUsersQuery } from './../../utils/queries';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await client.fetch(allUsersQuery());

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(400).json([]);
  }
}

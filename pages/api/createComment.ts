import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';

const client = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6st1ov0q',
  useCdn: true,
  token:
    process.env.SANITY_API_TOKEN ||
    'skeuUXuInGYlgtfwaAaw4FzKquWHWOzIhE1rnW7lw0ilgdFW3wr4EUUplV2sNI3eQbqqkCOOgxgwKfYwd0wsn2c8rAnDzWLMC221PLa8rfIrke7ZuWBmLiyb9KMhBlsgQeZJgQcwAVMLr7dlHFkxzulYj0OyOJ15C6SF2WLbd9JvFGmSF1UV',
});

export default async function createComment(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id, name, email, comment } = req.body;

    const newComment = await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    });
    
  } catch (error) {
    return res.status(404).json({message:`could not find the true comment`,error})
  }
  console.log("comment submitted successfully")
  return res.status(200).json({message:`Comment submitted successfully`});
}






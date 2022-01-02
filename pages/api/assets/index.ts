import { connectToDatabase } from '../../../lib/mongo'

const handler = async (req: any, res: any) => {
  const { db } = await connectToDatabase();
  const { page } = req.query;
  const pageSize = 10;

  const assets = await db
    .collection("nft_assets")
    .find({})
    .skip((page - 1) * pageSize)
    .limit(10)
    .toArray();

  res.json(assets);
};

export default handler;
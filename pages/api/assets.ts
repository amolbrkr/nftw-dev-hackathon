import { connectToDatabase } from '../../lib/mongo'

const handler = async (req: any, res: any) => {
  const { db } = await connectToDatabase();

  const assets = await db
    .collection("nft_assets")
    .find({})
    .limit(50)
    .toArray();

  res.json(assets);
};

export default handler;
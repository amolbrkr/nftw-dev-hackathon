import { connectToDatabase } from '../../../lib/mongo'

const LikesHandler = async (req: any, res: any) => {
  const { db } = await connectToDatabase();
  const { assetId } = req.query;

  let asset = await db
    .collection('asset_details')
    .findOne({ id: parseInt(assetId) })


  if (req.method === 'GET') {
    res.json(asset.like_count);
  }

  if (req.method === 'POST') {
    await db
      .collection('asset_details')
      .updateOne({ id: parseInt(assetId) }, { $inc: { like_count: +1 } });
  }
};

export default LikesHandler;
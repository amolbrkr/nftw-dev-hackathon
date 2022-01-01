import { connectToDatabase } from '../../../lib/mongo'

const AssetSearchHandler = async (req: any, res: any) => {
  const { db } = await connectToDatabase();
  const { query } = req.query;

  let assets: any[] = [];

  const aggr = [{ $search: { index: 'default', text: { query: query, path: { wildcard: '*' } } } }]
  await db.collection('nft_assets')
    .aggregate(aggr).forEach((doc: any) => assets.push(doc));

  res.json(assets);
};

export default AssetSearchHandler;
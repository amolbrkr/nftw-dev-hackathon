import { connectToDatabase } from '../../../lib/mongo'

const AssetSearchHandler = async (req: any, res: any) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  const [contractAddr, tokenId] = id.split('__')

  const asset = await db
    .collection('asset_details')
    .findOne({ "asset_contract.address": contractAddr, token_id: tokenId });

  if (asset) res.json(asset);
  else {
    fetch(`https://api.opensea.io/api/v1/asset/${contractAddr}/${tokenId}/`)
      .then(res => res.json())
      .then(async data => {
        await db
          .collection('asset_details')
          .insertOne({ ...data, like_count: 0 });
        res.json({ ...data, like_count: 0 });
      });
  }
};

export default AssetSearchHandler;
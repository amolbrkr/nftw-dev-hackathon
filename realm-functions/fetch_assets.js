exports = async function(arg) {
  const http = context.http;
  const db = context.services.get("mongodb-atlas").db("RealmCluster");
  
  let offset = null;
  //Get last fetched offset
  await db.collection('meta_data').find().sort({ _id : -1}).limit(1).toArray().then(res => {
    offset = res[0].offset + 1;
  });
  
  //Try to fetch next 200 offsets
  while (offset < offset + 200) {
    let res = await http.get({ url: `https://api.opensea.io/api/v1/assets?order_by=sale_count&order_direction=desc&offset=${offset}&limit=50`});
    let body = EJSON.parse(res.body.text());
    
    db.collection('nft_assets').insertMany(body.assets);
    db.collection('meta_data').insertOne({ offset: offset, num_assets: body.assets.length });
    offset += 1;
  }
};
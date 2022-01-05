exports = async function (arg) {
  const http = context.http;
  const db = context.services.get("mongodb-atlas").db("RealmCluster");

  let res = await db.collection("nft_assets").find({}).toArray();
  for (let i = 0; i < res.length; i++) {
    const [addr, token] = [res[i].asset_contract.address, res[i].token_id];

    let response = await http.get({
      url: `https://api.opensea.io/api/v1/asset/${addr}/${token}/`,
    });
    let body = EJSON.parse(response.body.text());

    db.collection("asset_details").insertOne(body);
  }
};

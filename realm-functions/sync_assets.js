exports = async function (arg) {
  const http = context.http;
  const db = context.services.get("mongodb-atlas").db("RealmCluster");

  const syncData = await db.collection("sync_metadata").findOne({ id: "1" });
  let offset = syncData.offset;

  let res = await http.get({
    url: `https://api.opensea.io/api/v1/assets?order_by=sale_count&order_direction=desc&offset=${syncData.offset}&limit=1`,
  });
  let data = EJSON.parse(res.body.text());

  //Update asset listing
  await db
    .collection("nft_assets")
    .replaceOne({ id: data.assets[0].id }, data.assets[0], { upsert: true });

  //Update details for that asset
  let response = await http.get({
    url: `https://api.opensea.io/api/v1/asset/${data.assets[0].asset_contract.address}/${data.assets[0].token_id}/`,
  });
  let body = EJSON.parse(response.body.text());
  let details = await db.collection("asset_details").findOne({ id: body.id });

  if (!details) {
    await db.collection("asset_details").insertOne({ ...body, like_count: 0 });
  } else if (details && !details.like_count) {
    await db
      .collection("asset_details")
      .replaceOne(
        { id: body.id },
        { ...body, like_count: 0 },
        { upsert: true }
      );
  } else {
    await db
      .collection("asset_details")
      .replaceOne(
        { id: body.id },
        { ...body, like_count: details.like_count },
        { upsert: true }
      );
  }

  await db
    .collection("sync_metadata")
    .updateOne({ id: "1" }, { $set: { offset: syncData.offset + 1 } });
};

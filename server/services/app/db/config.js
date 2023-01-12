const { MongoClient } = require("mongodb");

let db;

async function mongoConnect() {
  try {
    const uri = process.env.ATLAS_URI;
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("pajak");
    db = database;
  } catch (error) {
    console.log(error);
  }
}

function getDb() {
  return db;
}

module.exports = {
  mongoConnect,
  getDb,
};

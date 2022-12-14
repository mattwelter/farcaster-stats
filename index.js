const { MongoClient } = require("mongodb");
require('dotenv').config();



const username = encodeURIComponent(process.env.USERNAME)
const password = encodeURIComponent(process.env.PASSWORD)
const clusterUrl = process.env.CLUSTERURL

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}?w=majority&authMechanism=DEFAULT`;
const client = new MongoClient(uri);
console.log(uri)

client.connect(err => {
  const collection = client.db("Farcaster").collection("profiles");

  // perform actions on the collection object

  client.close();
});

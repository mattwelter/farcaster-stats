const { MongoClient } = require("mongodb");
require('dotenv').config();



const username = encodeURIComponent(process.env.USERNAME)
const password = encodeURIComponent(process.env.PASSWORD)
const clusterUrl = process.env.CLUSTERURL

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}?w=majority&authMechanism=DEFAULT`;
const client = new MongoClient(uri);

console.log(uri)

async function run() {
  try {
    await client.connect();
    const database = client.db("Farcaster");
    const profiles = database.collection("profiles");
    const cursor = profiles.find();
    await cursor.forEach(doc => console.dir(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);





// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://kay:myRealPassword@cluster0.mongodb.net/test?w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//  // perform actions on the collection object
//   client.close();
// });

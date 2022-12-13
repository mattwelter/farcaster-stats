const { MongoClient } = require("mongodb");
require('dotenv').config();



const username = process.env.USERNAME
const password = process.env.PASSWORD
const clusterUrl = process.env.CLUSTERURL
console.log(username, password, clusterUrl)

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}?w=majority&authMechanism=DEFAULT`;
const client = new MongoClient(uri);


async function run() {
  try {
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
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

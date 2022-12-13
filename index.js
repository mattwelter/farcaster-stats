const { MongoClient } = require("mongodb");
require('dotenv').config();


// Replace the following with values for your environment.
const username = process.env.USERNAME
const password = process.env.PASSWORD
const clusterUrl = process.env.CLUSTERURL
console.log(username, password, clusterUrl)

const authMechanism = "DEFAULT";
// Replace the following with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
// Create a new MongoClient
const client = new MongoClient(uri);
// Function to connect to the server
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
import { IdRegistry, IdRegistryEvents } from './contracts/types/id-registry.js'
import { idRegistryAddr, idRegistryAbi } from './contracts/id-registry.js'
import { providers, Contract } from 'ethers'
import cron from 'node-cron'
import got from 'got'

const { MongoClient } = require("mongodb");
require('dotenv').config();

// Set up the provider
const ALCHEMY_SECRET = process.env.ALCHEMY_SECRET
const provider = new providers.AlchemyProvider('goerli', ALCHEMY_SECRET)

// Create ID Registry contract interface
const idRegistry = new Contract(
  idRegistryAddr,
  idRegistryAbi,
  provider
)

// Get env variables and setup MongoDB auth
const username = encodeURIComponent(process.env.USERNAME)
const password = encodeURIComponent(process.env.PASSWORD)
const clusterUrl = process.env.CLUSTERURL
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}?w=majority&authMechanism=DEFAULT`;
const client = new MongoClient(uri);
console.log(uri)

// Listen for new events on the ID Registry
const eventToWatch = 'Register'
idRegistry.on(eventToWatch, async (to, id) => {
  console.log('New user registered.', Number(id), to)

  const res = await got(
    `https://api.farcaster.xyz/v2/user?fid=${id}`
  ).json()
  console.log(res)

  const profile = {
    'id': Number(id),
    'address': to,
    'registered_at': new Date(),
  }

  client.connect(err => {
    const collection = client.db("farcaster").collection("profiles");


    collection.insert({ "metadata": { "fid": Number(id) }, "timestamp": new Date(), "profile": profile })
    //client.close();
  });
})






// client.connect(err => {
//   const collection = client.db("farcaster").collection("profiles");





//   collection.insert({
//         "metadata": { "fid": Number(id) },
//         "timestamp": new Date(),
//         "profile": profile
//      }
//   )

//   // client.close();
// });






// // Listen for new events on the ID Registry
// const eventToWatch: IdRegistryEvents = 'Register'
// idRegistry.on(eventToWatch, async (to, id) => {
//   console.log('New user registered.', Number(id), to)

//   const profile = {
//     'id': Number(id),
//     'address': to,
//     'registered_at': new Date(),
//   }

//   // Save to supabase
//   await supabase.from(profilesTable).insert(profile)
// })









// // Make sure we didn't miss any profiles when the indexer was offline
// await upsertAllRegistrations(provider, idRegistry)

// // Run job every 30 minutes
// cron.schedule('*/30 * * * *', async () => {
//   await indexAllCasts()
//   await deleteCasts()
// })

// // Run job every 2 hours
// // '0 */2 * * *'
// cron.schedule('*/40 * * * *', async () => {
//   await updateAllProfiles()
// })

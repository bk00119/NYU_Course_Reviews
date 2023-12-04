import { MongoClient } from "mongodb"

const URI = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local")
}

let client = new MongoClient(URI, options)
let clientPromise

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    // client = new MongoClient(URI, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // client = new MongoClient(URI, options)
  clientPromise = client.connect()
}

export default clientPromise

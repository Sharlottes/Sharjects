import { MongoClient, ServerApiVersion } from 'mongodb'

//TODO - set mongo db uri into environment data
const uri: string | undefined = process.env.MONGODB_URI ?? 'mongodb://localhost/';
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  serverApi: ServerApiVersion.v1
}

let client;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local")
}

type withMongoPromise = (typeof global) & ({ '_mongoClientPromise': Promise<MongoClient>; });
const globalWithMongo: withMongoPromise = global as withMongoPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

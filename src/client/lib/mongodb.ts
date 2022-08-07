import { MongoClient, ServerApiVersion } from 'mongodb'

const uri: string = process.env.MONGODB_URI as string;
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
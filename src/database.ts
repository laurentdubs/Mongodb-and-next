import { MongoClient } from "mongodb";




const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb: MongoClient = null;

export function getDatabase(): Promise<MongoClient> {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(MONGODB_URI)
    .then((db: any) => {
      cachedDb = db;
      return cachedDb;
    });
}
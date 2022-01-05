import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    if (MONGODB_URI && MONGODB_DB) {
        let client = new MongoClient(MONGODB_URI, opts as any);
        await client.connect();
        let db = client.db(MONGODB_DB);

        cachedClient = client;
        cachedDb = db;
    } else {
        throw new Error('Unable to access MONGODB_URI or MONGODB_DB environment variables!');
    }

    return {
        client: cachedClient,
        db: cachedDb,
    };
}
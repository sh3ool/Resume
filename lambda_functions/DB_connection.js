console.log("Hello !");

const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'sample_airbnb';

let cachedDb = null;
console.log("Hello world!");
const connectToDatabase = async (uri) => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });
  console.log("connected 1");
  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

const queryDatabase = async (db) => {
  const DB_connection = await db.collection("sample_airbnb").find({}).toArray();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(DB_connection),
  };
};
// ./lambda_functions/DB_connection.js

const pushToDatabase = async (db, data) => {
    const testData = {
      name: data.name,
      number: data.number,
    };
  
    if (testData.name && testData.number) {
      await db.collection("sample_airbnb").insertMany([data]);
      return { statusCode: 201 };
    } else {
      return { statusCode: 422 };
    }
  };

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);
  
  switch (event.httpMethod) {
    case "GET":
      return queryDatabase(db);
    case "POST":
      return pushToDatabase(db, JSON.parse(event.body));
    default:
      return { statusCode: 400 };
  }
};
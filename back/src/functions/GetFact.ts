import { app, HttpResponseInit } from '@azure/functions';
import { MongoClient } from 'mongodb';

async function getFact(): Promise<HttpResponseInit> {
  const mongoUri = process.env["MONGODB_URI"];
  const mongoClient = new MongoClient(mongoUri);
  const database = mongoClient.db('main');
  const collection = database.collection('facts');

  let doc = await collection.aggregate([
    { $sample: { size: 1 } },
    { $project: { _id: 0 } }
  ]).next();

  return { jsonBody: doc, status: 200 };
}

app.http('GetFact', {
  methods: ['GET'],
  handler: getFact
});

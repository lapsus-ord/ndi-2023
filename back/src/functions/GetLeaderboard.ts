import { app, HttpResponseInit } from '@azure/functions';
import { MongoClient } from 'mongodb';

async function getLeaderboard(): Promise<HttpResponseInit> {
  const mongoUri = process.env["MONGODB_URI"];
  const mongoClient = new MongoClient(mongoUri);
  const database = mongoClient.db('main');
  const collection = database.collection('users');

  const docs = await collection.aggregate([
    { $project: { _id: 0, username: 1, score: 1 } },
    { $sort: { score: -1 } },
    { $limit: 10 },
  ]).toArray();

  return { jsonBody: docs, status: 200 };
}

app.http('GetLeaderboard', {
  methods: ['GET'],
  handler: getLeaderboard
});

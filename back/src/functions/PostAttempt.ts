import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import { MongoClient } from 'mongodb';

const CORRECT_SCORE = 10;

type PostAttemptBody = {
  username: string,
  fact: string,
  correct: boolean,
};

function validatePostAttemptBody(body: any): asserts body is PostAttemptBody {
  if (typeof body !== 'object') {
    throw new Error('Body must be an object');
  }

  if (typeof body.username !== 'string') {
    throw new Error('Username must be a string');
  }

  if (typeof body.fact !== 'string') {
    throw new Error('Fact must be a string');
  }

  if (typeof body.correct !== 'boolean') {
    throw new Error('Correct must be a boolean');
  }
}

async function postAttempt(request: HttpRequest): Promise<HttpResponseInit> {
  let body = await request.json();

  try {
    validatePostAttemptBody(body);
  } catch (e) {
    return {
      status: 400,
      body: e.message,
    }
  }

  const mongoUri = process.env["MONGODB_URI"];
  const mongoClient = new MongoClient(mongoUri);
  const database = mongoClient.db('main');
  const collection = database.collection('users');

  await collection.updateOne(
    {username: body.username},
    {
      $push: {
        attempts: {
          fact: body.fact,
          correct: body.correct,
          timestamp: new Date(),
        }
      },
      $inc: {
        score: body.correct ? CORRECT_SCORE : 0,
      }
    },
    {upsert: true}
  )

  return { status: 200 };
}

app.http('PostAttempt', {
  methods: ['POST'],
  handler: postAttempt
});

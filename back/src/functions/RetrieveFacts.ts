import { app } from '@azure/functions';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { MongoClient } from 'mongodb';

const messages = [
  { role: 'user', content: 'Donne moi des faits vrais ou faux sur le réchauffement climatique. Ne me dis rien d\'autre.\\n\\nMets les sous forme d\'une liste JSON contenant un objet JSON par fait :\\n- le fait sera dans la clé `fact` et sera une chaine de caractère\\n- sa véracité sera dans la clé `truth` et sera un booléen\\n- une explication sera dans la clé `explanation` et sera une chaine de caractère\\n\\nIl y aura 50% de faits vrais et 50% de faits faux.' },
];

async function retrieveFacts(): Promise<void> {
  const endpoint = process.env["OPENAI_URI"];
  const azureApiKey = process.env["OPENAI_API_KEY"];
  const deploymentId = process.env["OPENAI_MODEL"];

  const mongoUri = process.env["MONGODB_URI"];
  const mongoClient = new MongoClient(mongoUri);

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const completions = await client.getChatCompletions(deploymentId, messages);

  if (completions.choices.length === 0) {
    return;
  }

  const completion = completions.choices[0];
  if (completion.finishReason !== 'stop') {
    return;
  }

  const completionMessage = completion.message;
  if (completionMessage === undefined) {
    return;
  }

  const database = mongoClient.db('main');
  const collection = database.collection('facts');
  await collection.insertMany(JSON.parse(completionMessage.content));
}

app.timer('TimerRetrieveFacts', {
  schedule: '0 * * * * *',
  handler: retrieveFacts
});

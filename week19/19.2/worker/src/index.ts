import { createClient } from "redis";
const client = createClient();

async function processSubmission(submission: string) {
  const { problemId, code, language } = JSON.parse(submission);

  console.log(`Processing submission for problemId ${problemId}...`);
  console.log(`Code: ${code}`);
  console.log(`Language: ${language}`);
  // Here you would add your actual processing logic

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Finished processing submission for problemId ${problemId}.`);
}

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis");

    // this code will keep running as long as the server is up
    // brpop will only pop from the list whenever there will be elements present in the list
    while (true) {
      try {
        const submission = await client.brPop("problems", 0);
        console.log(submission);
        // @ts-ignore
        await processSubmission(submission.element);
      } catch (err) {
        console.error("Error processing submission: ", err);
      }
    }
  } catch (err) {
    console.error("Error connecting to Redis: ", err);
  }
}

startWorker();

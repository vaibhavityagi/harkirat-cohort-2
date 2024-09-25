// implemention of a message queue for a leetcode backend
// message queue architecture makes sense when you have to perfom an operation which can be off loaded to a worker

import express from "express";
import { createClient } from "redis";

const app = express();

app.use(express.json());

// creating the redis client to talk to the redis server
const client = createClient();
client.on("error", (err) => console.log("Redis client error: ", err));

app.post("/submit", async (req, res) => {
  const problemId = req.body.problemId;
  const code = req.body.code;
  const language = req.body.language;

  try {
    // promblems is the name of the queque
    await client.lPush("problems", JSON.stringify(req.body));
    // store in the database
    return res.status(200).send("Submission received and stored");
  } catch (err) {
    console.error("Redis error: ", err);
    return res.status(500).send("Failed to store submission");
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => console.log("Listening on port 3000"));
  } catch (err) {
    console.error("Failed to connect to Redis: ", err);
  }
}

startServer();

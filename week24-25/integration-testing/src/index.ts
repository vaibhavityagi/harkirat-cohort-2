import express from "express";
import { prismaClient } from "./db";
export const app = express();

app.use(express.json());

app.post("/sum", async (req, res) => {
  const { a, b } = req.body;
  const response = await prismaClient.request.create({
    data: {
      a: a,
      b: b,
      answer: a + b,
      type: "ADD",
    },
  });

  return res.status(200).json({
    answer: a + b,
    id: response.id,
  });
});

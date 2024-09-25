import express from "express";
import { z } from "zod";
import { prisma } from "./db";

export const app = express();

app.use(express.json());

const sumInput = z.object({
  a: z.number(),
  b: z.number(),
});

app.get("/sum", (req, res) => {
  const parsedData = sumInput.safeParse({
    a: Number(req.headers.a),
    b: Number(req.headers["b"]),
  });

  if (!parsedData.success)
    return res.status(411).json({
      message: "Invalid inputs",
    });

  return res.status(200).json({
    answer: parsedData.data?.a + parsedData.data?.b,
  });
});

app.post("/sum", async (req, res) => {
  const isValid = sumInput.safeParse(req.body);
  // console.log(isValid);
  if (!isValid.success)
    return res.status(411).json({
      message: "Invalid inputs",
    });

  // save the data in the database
  // in unit testing, you assume that any external service upon which your code is depended, performs it's task in the correct manner
  // for this, we mock the dependencies during unit testing
  // in unit testing, you have to spy on the fn to ensure that the correct input is passed to the external service
  const response = await prisma.sum.create({
    data: {
      a: isValid.data.a,
      b: isValid.data.b,
      result: isValid.data.a + isValid.data.b,
    },
  });

  return res.status(200).json({
    answer: isValid.data?.a + isValid.data?.b,
    id: response.id,
  });
});

import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// app.use(”*”, (c) => {
// 	const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set(”prisma”, prisma);
// })

import { z } from "zod";
import { sign, verify } from "hono/jwt";

const SignUpSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
});

const TodoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

app.use("/signup/*", async (c, next) => {
  type Body = z.infer<typeof SignUpSchema>;
  const body: Body = await c.req.json();
  const isValidated = SignUpSchema.safeParse(body);
  if (isValidated.success) await next();
  return c.json({ message: "Invalid inputs" });
});

app.use("/todos/*", async (c, next) => {
  const body = await c.req.json();
  const isValidated = TodoSchema.safeParse(body);
  if (isValidated.success) await next();
  return c.json({ message: "Invalid inputs" });
});

app.use("/todos/", async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    // --------------------------------------------------------
    const decoded = await verify(token, "badSecret");
    console.log(decoded);
    // put userId in the request object
    // req.userId = (decoded as jwt.JwtPayload).userId;
    await next();
  } catch (err) {
    return c.json({
      message: "Invalid token",
    });
  }
});

app.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const result = await prisma.user.create({
    data: body,
  });
  const token = await sign({ userId: result.id }, "badSecret");
  return c.json({ token });
});

app.get("/todos", async (c) => {
  // console.log("hit");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const result = await prisma.todo.findMany({
    where: {},
  });
  return c.json({ todos: result });
});

app.post("/todos", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const { title, description, userId } = await c.req.json();
  await prisma.todo.create({
    data: {
      title,
      description,
      userId,
    },
  });
  return c.json({ message: "Successfully added todo" });
});

export default app;

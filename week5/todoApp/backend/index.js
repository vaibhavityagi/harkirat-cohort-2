const PORT = 3000;
const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.json({ todos });
});

app.post("/todos", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    return res.status(411).json({
      msg: "You sent the wrong inputs",
    });
  }

  const newTodo = new Todo({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  await newTodo.save();

  res.json({
    msg: "Todo created",
  });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    return res.status(411).json({
      msg: "You sent the wrong inputs",
    });
  }

  await Todo.updateOne({ _id: updatePayload._id }, { completed: true });
  res.json({
    msg: "Todo marked as completed",
  });
});

app.get("*", (req, res) => {
  res.send("Todo Application");
});

app.use((err, req, res, next) => {
  res.send("An error occured");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

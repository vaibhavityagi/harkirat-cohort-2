const express = require("express");
const zod = require("zod");

const app = express();

const schema = zod.array(zod.number());

app.use(express.json());

app.get("/health-checkup", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = req.query.kidneyId;

  if (username == "vaibhavi" && password == "123") {
    if (kidneyId == 1 || kidneyId == 2) {
      res.json({
        msg: "Your kidney is fine!",
      });
    }
  }

  res.status(400).json({ msg: "Something is up w your inputs" });
});

app.post("/health-checkup", (req, res) => {
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  res.send(response);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

// global catch - takes 4 inputs
// special error handling middleware
app.use((err, req, res, next) => {
  console.log("error");
  res.status(404).res.json({
    msg: "Something is wrong with our server",
  });
});

app.listen(3000, () => console.log("listening on port 3000"));

// const schema = zod.object({
//     email: zod.string.email(),
//     password: zod.string.min(8)
// })

// schema.safeParse(<whatever you want to validate>)

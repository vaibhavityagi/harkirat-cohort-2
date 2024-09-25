const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const { Schema } = mongoose;
const app = express();

// setting up conncetion to mongo db
mongoose
  .connect(
    "mongodb+srv://vaibhavi:2EMQZTRIHntNISbH@cluster0.0r7fzlf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("SUCESSFULL MONGO CONNCECTION");
  })
  .catch((err) => {
    console.log(`ran into an error: ${err}`);
  });

// defining the schema
const UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
});

// model of the schema
const User = mongoose.model("User", UserSchema);

// initally inserting some data into the model
// User.insertMany([
//   {
//     username: "harkirat@gmail.com",
//     password: "123",
//     name: "harkirat singh",
//   },
//   {
//     username: "raman@gmail.com",
//     password: "123321",
//     name: "Raman singh",
//   },
//   {
//     username: "priya@gmail.com",
//     password: "123321",
//     name: "Priya kumari",
//   },
// ])
//   .then((data) => {
//     console.log(`inserted: ${data}`);
//   })
//   .catch((err) => {
//     console.log(`Error: ${error}`);
//   });

// for parsing the body
app.use(express.json());

async function userExists(username, password) {
  // write logic to return true or false if this user exists
  const foundUser = await User.findOne({
    username: username,
    password: password,
  });
  if (foundUser) return true;
  else return false;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  //   cz async functions always return a promise
  const user = async () => {
    const ans = await userExists(username, password);
    if (!ans) {
      return res.status(403).json({
        msg: "User doesnt exist in our in memory db",
      });
    }

    let token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
      token,
    });
  };

  user();
});

app.get("/users", async function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    // return a list of users other than this username
    const allUsers = await User.find({});
    const users = allUsers.filter((user) => user.username !== username);
    res.json(users);
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);

import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const app = express();

const JWT_SECRET = "badsecret";

app.use(express.json());
app.use(cookieParser());
// need to use these cors options to allow cross origin access from the frontend for setting cookies
// no need to use cors at all when both frontend and backend are on the same server - nextJs
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.post("/signin", (req, res) => {
  const { email, passwrod } = req.body;
  // db call to check for the user and get the id to sign the token
  // token generation and validation is done with jwt
  //  cookie just helps to send the token in every subsequent request without manually attaching it in the headers by extraction from local storage
  const token = jwt.sign({ id: 2 }, JWT_SECRET);
  // sets the cookie in headers under set-cookie with the name = token
  res.cookie("token", token);
  res.status(200).json({ message: "successful sign-in" });
});

// a protected route
app.get("/user", (req: Request, res: Response) => {
  const decode = jwt.verify(req.cookies.token, JWT_SECRET) as JwtPayload;
  res.json({
    userId: decode.id,
  });
  //   use the id to find the user from the db and return the user details
});

app.post("/logout", (req, res) => {
  // res.cookie("token", "") or
  res.clearCookie("token");
  res.json({
    message: "Successfully logged out",
  });
});

// allows to run frontend from the same server, similar to ejs
// index.html is send at the specified path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(3000, () => console.log("listening on port 3000"));

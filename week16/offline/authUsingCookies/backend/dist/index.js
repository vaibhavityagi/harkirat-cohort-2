"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const JWT_SECRET = "badsecret";
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173",
}));
app.post("/signin", (req, res) => {
    const { email, passwrod } = req.body;
    // db call to check for the user and get the id to sign the token
    // token generation and validation is done with jwt
    //  cookie just helps to send the token in every subsequent request without manually attaching it in the headers by extraction from local storage
    const token = jsonwebtoken_1.default.sign({ id: 2 }, JWT_SECRET);
    // sets the cookie in headers under set-cookie with the name = token
    res.cookie("token", token);
    res.status(200).json({ message: "successful sign-in" });
});
// a protected route
app.get("/user", (req, res) => {
    const decode = jsonwebtoken_1.default.verify(req.cookies.token, JWT_SECRET);
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
    res.sendFile(path_1.default.join(__dirname, "../src/index.html"));
});
app.listen(3000, () => console.log("listening on port 3000"));

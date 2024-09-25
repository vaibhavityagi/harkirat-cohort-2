"use strict";
// implemention of a message queue for a leetcode backend
//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// creating the redis client to talk to the redis server
const client = (0, redis_1.createClient)();
client.on("error", (err) => console.log("Redis client error: ", err));
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problemId = req.body.problemId;
    const code = req.body.code;
    const language = req.body.language;
    try {
        // promblems is the name of the queque
        yield client.lPush("problems", JSON.stringify(req.body));
        // store in the database
        return res.status(200).send("Submission received and stored");
    }
    catch (err) {
        console.error("Redis error: ", err);
        return res.status(500).send("Failed to store submission");
    }
}));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to Redis");
            app.listen(3000, () => console.log("Listening on port 3000"));
        }
        catch (err) {
            console.error("Failed to connect to Redis: ", err);
        }
    });
}
startServer();

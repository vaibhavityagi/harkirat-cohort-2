"use strict";
// todo application using prisma and postgres
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
app.use(express_1.default.json());
const SignUpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    password: zod_1.z.string().min(8),
});
const TodoSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
});
const validateSignUpBody = (req, res, next) => {
    const isValidated = SignUpSchema.safeParse(req.body);
    isValidated.success ? next() : res.json({ message: "Invalid inputs" });
};
const validateTodoBody = (req, res, next) => {
    const isValidated = TodoSchema.safeParse(req.body);
    isValidated.success ? next() : res.json({ message: "Invalid inputs" });
};
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "badSecret");
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(403).json({
            message: "Invalid token",
        });
    }
};
app.post("/signup", validateSignUpBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.create({
        data: req.body,
    });
    const token = jsonwebtoken_1.default.sign({ userId: result.id }, "badSecret");
    res.json({ token });
}));
app.get("/todos", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const result = yield prisma.todo.findMany({
        where: { id },
    });
    res.json({ todos: result });
}));
app.post("/todos", authMiddleware, validateTodoBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, userId } = req.body;
    yield prisma.todo.create({
        data: {
            title,
            description,
            userId,
        },
    });
    res.json({ message: "Successfully added todo" });
}));
app.listen(3000, () => console.log("Listening on port 3000"));
function insertUser({ email, password, firstName, lastName, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                email,
                password,
                firstName,
                lastName,
            },
        });
        console.log(res);
    });
}
function updateData(username, { firstName, lastName }) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.update({
            where: { email: username },
            data: {
                firstName,
            },
        });
        console.log(res);
    });
}
// updateData("vaibhavi123@gmail.com", {
//   lastName: "tyagi",
//   firstName: "vaivahi",
// });
// fetch user details
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findFirst({
            where: { email },
        });
        console.log(res);
    });
}
// getUser("vaibhavi123@gmail.com");
//  -------------------- TODO functions ----------------------------
// add todo in the database
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.create({
            data: {
                userId,
                title,
                description,
            },
            // select: {
            //   title: true,
            //   description: true,
            // },
        });
        console.log(res);
    });
}
// retreive all todos
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.findMany({
            where: { userId },
        });
        console.log(res);
    });
}
function getTodosAndUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.findMany({
            where: { userId },
            select: {
                User: true,
                title: true,
                description: true,
            },
        });
        console.log(res);
    });
}

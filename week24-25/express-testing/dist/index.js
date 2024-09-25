"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const sumInput = zod_1.z.object({
    a: zod_1.z.number(),
    b: zod_1.z.number(),
});
exports.app.get("/sum", (req, res) => {
    var _a, _b;
    const parsedData = sumInput.safeParse({
        a: Number(req.headers.a),
        b: Number(req.headers["b"]),
    });
    if (!parsedData.success)
        return res.status(411).json({
            message: "Invalid inputs",
        });
    return res.status(200).json({
        answer: ((_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.a) + ((_b = parsedData.data) === null || _b === void 0 ? void 0 : _b.b),
    });
});
exports.app.post("/sum", (req, res) => {
    var _a, _b;
    const isValid = sumInput.safeParse(req.body);
    // console.log(isValid);
    if (!isValid.success)
        return res.status(411).json({
            message: "Invalid inputs",
        });
    return res.status(200).json({
        answer: ((_a = isValid.data) === null || _a === void 0 ? void 0 : _a.a) + ((_b = isValid.data) === null || _b === void 0 ? void 0 : _b.b),
    });
});

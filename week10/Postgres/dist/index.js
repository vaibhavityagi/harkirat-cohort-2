"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://postgres:badsecret@localhost:5432/postgres",
});
//creating table
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `);
        console.log(result);
    });
}
// inserting data into the users table
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const q = `INSERT INTO USERS (username, email, password)
    VALUES ('vaibhavi22', 'vaibhavi123@gmail.com', '123456789');`;
        const result = yield client.query(q);
        console.log("Insertion success: ", result);
    });
}
// listing data
function printAll() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query("SELECT * FROM USERS;");
        console.log("Data inside users table: ", result);
    });
}
//delete data
// closing the connection
function cleanUp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.end();
        console.log("after error");
    });
}
try {
    // createUsersTable();
    // insertData();
    printAll();
}
catch (err) {
    console.log(err);
}
//  finally {
//   cleanUp();
// }

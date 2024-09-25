import { Client } from "pg";

const client = new Client({
  connectionString: "postgresql://postgres:badsecret@localhost:5432/postgres",
});

//creating table
async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `);
  console.log(result);
}

// inserting data into the users table
async function insertData() {
  await client.connect();
  const q = `INSERT INTO USERS (username, email, password)
    VALUES ('vaibhavi22', 'vaibhavi123@gmail.com', '123456789');`;
  const result = await client.query(q);
  console.log("Insertion success: ", result);
}

// listing data
async function printAll() {
  await client.connect();
  const result = await client.query("SELECT * FROM USERS;");
  console.log("Data inside users table: ", result);
}

//delete data

// closing the connection
async function cleanUp() {
  await client.end();
  console.log("after error");
}

try {
  // createUsersTable();
  // insertData();
  printAll();
} catch (err) {
  console.log(err);
}
//  finally {
//   cleanUp();
// }

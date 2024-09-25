// todo application using prisma and postgres
// clients are js classes

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface InsertionParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

async function insertUser({
  email,
  password,
  firstName,
  lastName,
}: InsertionParams) {
  const res = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });
  console.log(res);
}

// insertUser({
//   email: "vaibhavi123@gmail.com",
//   password: "impassword",
//   firstName: "vaibhavi",
//   lastName: "tyagi",
// });

// update data
interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function updateData(
  username: string,
  { firstName, lastName }: UpdateParams
) {
  const res = await prisma.user.update({
    where: { email: username },
    data: {
      firstName,
    },
  });
  console.log(res);
}

// updateData("vaibhavi123@gmail.com", {
//   lastName: "tyagi",
//   firstName: "vaivahi",
// });

// fetch user details
async function getUser(email: string) {
  const res = await prisma.user.findFirst({
    where: { email },
  });
  console.log(res);
}

// getUser("vaibhavi123@gmail.com");

//  -------------------- TODO functions ----------------------------
// add todo in the database
async function createTodo(userId: number, title: string, description: string) {
  const res = await prisma.todo.create({
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
}

// retreive all todos
async function getTodos(userId: number) {
  const res = await prisma.todo.findMany({
    where: { userId },
  });
  console.log(res);
}

async function getTodosAndUserDetails(userId: number) {
  const res = await prisma.todo.findMany({
    where: { userId },
    select: {
      User: true,
      title: true,
      description: true,
    },
  });

  console.log(res);
}

import { prismaClient } from "../../db";

// the function deletes all the tables, if there is an error in deleting any table, the transaction rollbacks
export default async () => {
  await prismaClient.$transaction([prismaClient.request.deleteMany()]);
};

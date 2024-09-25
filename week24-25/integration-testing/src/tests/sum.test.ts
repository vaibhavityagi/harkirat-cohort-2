import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "..";
import resetDb from "./helpers/reset-db";

describe("POST /sum", () => {
  // runs beforeAll the tests defined in this suite
  beforeAll(async () => {
    console.log("Clearing the database");
    await resetDb();
  });

  it("should sum two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ answer: 3, id: expect.any(Number) });
  });
});

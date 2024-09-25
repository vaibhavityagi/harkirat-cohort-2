// import { describe, expect, it } from "@jest/globals";
import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "../index";
import { prisma } from "../__mocks__/db";

// mocking the database call
// vi.mock("../db", () => ({
//   prisma: {
//     sum: {
//       create: vi.fn(),
//     },
//   },
// }));

// deep mocking the db call => i.e. changes to the prisma object are identified by the lib itself and you don't have to manually adding to it
// __mocks__ folder should be on the same level as the file that you are mocking
vi.mock("../db");

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    // mocking the return value from the async call to the database
    prisma.sum.create.mockResolvedValue({
      a: 1,
      b: 2,
      result: 3,
      id: 1,
    });

    // sypying
    vi.spyOn(prisma.sum, "create");

    // .send contains the req body
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    // to check whether the inputs passed to the external service are correct or not
    expect(prisma.sum.create).toHaveBeenCalledWith({
      data: {
        a: 1,
        b: 2,
        result: 3,
      },
    });

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
    expect(res.body.id).toBe(1);
  });

  it("should return 411 if inputs are not valid", async () => {
    const res = await request(app).post("/sum").send({});
    expect(res.status).toBe(411);
    expect(res.body.message).toBe("Invalid inputs");
  });
});

describe("GET /sum", () => {
  it("should return sum of two numbers from headers", async () => {
    // .set contains the headers
    const res = await request(app).get("/sum").set({ a: "1", b: "2" }).send();
    expect(res.status).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("should return the sum of two negative numbers", async () => {
    const res = await request(app).get("/sum").set({ a: "-1", b: "-2" }).send();

    expect(res.status).toBe(200);
    expect(res.body.answer).toBe(-3);
  });

  it("should return the sum of two zero numbers", async () => {
    const res = await request(app).get("/sum").set({ a: "0", b: "0" }).send();

    expect(res.status).toBe(200);
    expect(res.body.answer).toBe(0);
  });

  it("should return 411 if inputs are not valid", async () => {
    const res = await request(app).get("/sum").send();
    expect(res.status).toBe(411);
    expect(res.body.message).toBe("Invalid inputs");
  });
});

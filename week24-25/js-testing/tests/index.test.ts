import { describe, expect, it, test } from "@jest/globals";
import { sum, multiply } from "../src";

describe("Testing sum function", () => {
  it("should sum 1 and 2 correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });

  // you can have multiple it blocks here
  // multiple tests against the same function

  it("should sum negative numbers correctly", () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});

describe("Testing multiply function", () => {
  test("multiply 2 and 3 to equal 6", () => {
    expect(multiply(2, 3)).toBe(6);
  });
});

// describes can also be nested inside another describe

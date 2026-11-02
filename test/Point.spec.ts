import { describe, it, expect } from "vitest";
import Point from "../src/Point";

describe("test Point", () => {
  it("test default constructor", () => {
    const p = new Point();

    expect(p.getCoordinate()).toEqual([]);
    expect(Number.isNaN(p.x())).toBe(true);
    expect(Number.isNaN(p.y())).toBe(true);
  });

  it("test constructor with coordinates", () => {
    const p = new Point([3.0, 4.0]);

    expect(p.getCoordinate()).toEqual([3.0, 4.0]);
    expect(p.x()).toBe(3.0);
    expect(p.y()).toBe(4.0);
  });
});


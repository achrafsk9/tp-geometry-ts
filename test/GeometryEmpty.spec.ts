
import { describe, it, expect } from "vitest";
import Point from "../src/Point";
import LineString from "../src/LineString";
import type Geometry from "../src/Geometry";

describe("0.2 - Geometry.isEmpty()", () => {

  it("should return true for an empty Point", () => {
    const p: Geometry = new Point();
    expect(p.isEmpty()).toBe(true);
  });

  it("should return false for a non-empty Point", () => {
    const p: Geometry = new Point([3, 4]);
    expect(p.isEmpty()).toBe(false);
  });

  it("should return true for an empty LineString", () => {
    const line = new LineString();
    expect(line.isEmpty()).toBe(true);
    expect(line.getPoints()).toEqual([]);
  });

  it("should return false for a non-empty LineString", () => {
    const line = new LineString([
      new Point([0, 0]),
      new Point([1, 1])
    ]);

    expect(line.isEmpty()).toBe(false);
  });

  it("should accept an empty coordinate array", () => {
    const p = new Point([]);

    expect(p.isEmpty()).toBe(true);
    expect(Number.isNaN(p.x())).toBe(true);
    expect(Number.isNaN(p.y())).toBe(true);
  });

  it("should handle null values safely", () => {
    const p = new Point(null);
    const line = new LineString(null);

    expect(p.getCoordinate()).toEqual([]);
    expect(line.getPoints()).toEqual([]);
    expect(p.isEmpty()).toBe(true);
    expect(line.isEmpty()).toBe(true);
  });

});

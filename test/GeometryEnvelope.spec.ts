import { describe, it, expect } from "vitest";
import type Geometry from "../src/Geometry";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("0.6 - Geometry.getEnvelope()", () => {

  it("should calculate the envelope of a Point", () => {
    const point = new Point([3, 4]);

    expect(point.getEnvelope().toString())
      .toBe("[3,4,3,4]");
  });

  it("should handle an empty Point", () => {
    const point = new Point();

    expect(point.getEnvelope().toString())
      .toBe("[NaN,NaN,NaN,NaN]");
  });

  it("should calculate the envelope of a LineString", () => {
    const line = new LineString([
      new Point([0, 1]),
      new Point([2, 0]),
      new Point([1, 3])
    ]);

    expect(line.getEnvelope().toString())
      .toBe("[0,0,2,3]");
  });

  it("should handle an empty LineString", () => {
    const line = new LineString();

    expect(line.getEnvelope().toString())
      .toBe("[NaN,NaN,NaN,NaN]");
  });

  it("should ignore empty Points in a LineString", () => {
    const line = new LineString([
      new Point(),
      new Point([2, 3]),
      new Point([-1, 5])
    ]);

    expect(line.getEnvelope().toString())
      .toBe("[-1,3,2,5]");
  });

  it("should work through the Geometry interface", () => {
    const geometries: Geometry[] = [
      new Point([3, 4]),
      new LineString([
        new Point([0, 0]),
        new Point([5, 7])
      ])
    ];

    expect(
      geometries.map(g => g.getEnvelope().toString())
    ).toEqual([
      "[3,4,3,4]",
      "[0,0,5,7]"
    ]);
  });

  it("should update the envelope after translation", () => {
    const line = new LineString([
      new Point([0, 0]),
      new Point([2, 3])
    ]);

    const before = line.getEnvelope();

    line.translate(10, 5);

    const after = line.getEnvelope();

    expect(before.toString()).toBe("[0,0,2,3]");
    expect(after.toString()).toBe("[10,5,12,8]");
  });

});

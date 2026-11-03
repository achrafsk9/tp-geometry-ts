
import { describe, it, expect } from "vitest";
import type Geometry from "../src/Geometry";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("0.3 - Geometry.translate()", () => {

  it("should translate a Point", () => {
    const p = new Point([3, 4]);

    p.translate(10, 5);

    expect(p.getCoordinate()).toEqual([13, 9]);
  });

  it("should support negative translations", () => {
    const p = new Point([5, 8]);

    p.translate(-2, -3);

    expect(p.getCoordinate()).toEqual([3, 5]);
  });

  it("should translate a LineString", () => {
    const line = new LineString([
      new Point([0, 0]),
      new Point([1, 1]),
      new Point([5, 5])
    ]);

    line.translate(2, 3);

    expect(
      line.getPoints().map(p => p.getCoordinate())
    ).toEqual([
      [2, 3],
      [3, 4],
      [7, 8]
    ]);
  });

  it("should not modify empty geometries", () => {
    const p = new Point();
    const line = new LineString();

    p.translate(10, 20);
    line.translate(10, 20);

    expect(p.isEmpty()).toBe(true);
    expect(line.isEmpty()).toBe(true);
    expect(p.getCoordinate()).toEqual([]);
    expect(line.getPoints()).toEqual([]);
  });

  it("should translate geometries through interface", () => {
    const geometries: Geometry[] = [
      new Point([1, 2]),
      new LineString([
        new Point([3, 4])
      ])
    ];

    geometries.forEach(g => g.translate(10, 10));

    expect(
      (geometries[0] as Point).getCoordinate()
    ).toEqual([11, 12]);

    expect(
      (geometries[1] as LineString)
        .getPoints()[0].getCoordinate()
    ).toEqual([13, 14]);
  });

});

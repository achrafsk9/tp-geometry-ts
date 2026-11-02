
import { describe, it, expect } from "vitest";
import type Geometry from "../src/Geometry";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("0.1 - Geometry", () => {
  it("Point implements Geometry", () => {
    const geometry: Geometry = new Point([3, 4]);

    expect(geometry.getType()).toBe("Point");
  });

  it("LineString implements Geometry", () => {
    const geometry: Geometry = new LineString([
      new Point([0, 0]),
      new Point([1, 1]),
    ]);

    expect(geometry.getType()).toBe("LineString");
  });

  it("LineString stores its points", () => {
    const p1 = new Point([0, 0]);
    const p2 = new Point([2, 3]);
    const line = new LineString([p1, p2]);

    expect(line.getPoints()).toEqual([p1, p2]);
  });

  it("Geometry supports polymorphism", () => {
    const geometries: Geometry[] = [
      new Point([3, 4]),
      new LineString([new Point([0, 0])]),
    ];

    expect(geometries.map(g => g.getType()))
      .toEqual(["Point", "LineString"]);
  });
});

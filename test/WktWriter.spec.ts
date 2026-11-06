
import { describe, it, expect } from "vitest";
import type Geometry from "../src/Geometry";
import Point from "../src/Point";
import LineString from "../src/LineString";
import WktWriter from "../src/WktWriter";

describe("0.7 - WktWriter", () => {

  it("should write a Point", () => {
    const point = new Point([3, 4]);
    const writer = new WktWriter();

    expect(writer.write(point))
      .toBe("POINT(3.0 4.0)");
  });

  it("should write an empty Point", () => {
    const point = new Point();
    const writer = new WktWriter();

    expect(writer.write(point))
      .toBe("POINT EMPTY");
  });

  it("should write decimal coordinates", () => {
    const point = new Point([2.5, 4.75]);
    const writer = new WktWriter();

    expect(writer.write(point))
      .toBe("POINT(2.5 4.75)");
  });

  it("should write a LineString", () => {
    const line = new LineString([
      new Point([0, 0]),
      new Point([1, 1]),
      new Point([5, 5])
    ]);

    const writer = new WktWriter();

    expect(writer.write(line))
      .toBe(
        "LINESTRING(0.0 0.0,1.0 1.0,5.0 5.0)"
      );
  });

  it("should write an empty LineString", () => {
    const line = new LineString();
    const writer = new WktWriter();

    expect(writer.write(line))
      .toBe("LINESTRING EMPTY");
  });

  it("should support negative coordinates", () => {
    const line = new LineString([
      new Point([-2, -3.5]),
      new Point([4, 5])
    ]);

    const writer = new WktWriter();

    expect(writer.write(line))
      .toBe(
        "LINESTRING(-2.0 -3.5,4.0 5.0)"
      );
  });

  it("should not modify the geometry", () => {
    const point = new Point([3, 4]);
    const writer = new WktWriter();

    writer.write(point);

    expect(point.getCoordinate())
      .toEqual([3, 4]);
  });

  it("should reject unsupported geometry types", () => {
    const writer = new WktWriter();
    const unsupported = {} as Geometry;

    expect(() => writer.write(unsupported))
      .toThrow(TypeError);

    expect(() => writer.write(unsupported))
      .toThrow("geometry type not supported");
  });

});

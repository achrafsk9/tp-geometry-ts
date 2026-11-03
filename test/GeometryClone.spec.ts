import { describe, it, expect } from "vitest";
import type Geometry from "../src/Geometry";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("0.4 - Geometry.clone()", () => {

  it("should clone a Point", () => {
    const p = new Point([3, 4]);
    const copy = p.clone();

    expect(copy).not.toBe(p);
    expect(copy.getType()).toBe("Point");
    expect(copy.getCoordinate()).toEqual([3, 4]);
  });

  it("should deeply copy Point coordinates", () => {
    const p = new Point([3, 4]);
    const copy = p.clone();

    expect(copy.getCoordinate())
      .not.toBe(p.getCoordinate());

    copy.translate(10, 10);

    expect(copy.getCoordinate()).toEqual([13, 14]);
    expect(p.getCoordinate()).toEqual([3, 4]);
  });

  it("should clone an empty Point", () => {
    const p = new Point();
    const copy = p.clone();

    expect(copy).not.toBe(p);
    expect(copy.isEmpty()).toBe(true);
    expect(copy.getCoordinate()).toEqual([]);
  });

  it("should deeply clone a LineString", () => {
    const line = new LineString([
      new Point([0, 0]),
      new Point([1, 1]),
      new Point([5, 5])
    ]);

    const copy = line.clone();

    expect(copy).not.toBe(line);
    expect(copy.getPoints()).not.toBe(line.getPoints());

    copy.getPoints().forEach((point, index) => {
      expect(point).not.toBe(line.getPoints()[index]);
      expect(point.getCoordinate())
        .not.toBe(line.getPoints()[index].getCoordinate());
    });

    copy.translate(10, 10);

    expect(
      copy.getPoints().map(p => p.getCoordinate())
    ).toEqual([
      [10, 10],
      [11, 11],
      [15, 15]
    ]);

    expect(
      line.getPoints().map(p => p.getCoordinate())
    ).toEqual([
      [0, 0],
      [1, 1],
      [5, 5]
    ]);
  });

  it("should clone an empty LineString", () => {
    const line = new LineString();
    const copy = line.clone();

    expect(copy).not.toBe(line);
    expect(copy.isEmpty()).toBe(true);
    expect(copy.getPoints()).toEqual([]);
  });

  it("should clone through Geometry interface", () => {
    const geometries: Geometry[] = [
      new Point([3, 4]),
      new LineString([
        new Point([1, 2])
      ])
    ];

    const copies = geometries.map(g => g.clone());

    copies.forEach(g => g.translate(10, 10));

    expect(
      (geometries[0] as Point).getCoordinate()
    ).toEqual([3, 4]);

    expect(
      (copies[0] as Point).getCoordinate()
    ).toEqual([13, 14]);

    expect(
      (geometries[1] as LineString)
        .getPoints()[0].getCoordinate()
    ).toEqual([1, 2]);

    expect(
      (copies[1] as LineString)
        .getPoints()[0].getCoordinate()
    ).toEqual([11, 12]);
  });

});

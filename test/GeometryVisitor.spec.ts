
import { describe, it, expect, vi, afterEach } from "vitest";
import type Geometry from "../src/Geometry";
import Point from "../src/Point";
import LineString from "../src/LineString";
import LogGeometryVisitor from "../src/LogGeometryVisitor";

describe("0.8 - GeometryVisitor", () => {

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should visit an empty Point", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const point = new Point();
    const visitor = new LogGeometryVisitor();

    point.accept(visitor);

    expect(log).toHaveBeenCalledWith("Je suis un point vide.");
  });

  it("should visit a Point with coordinates", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const point = new Point([2, 3]);
    const visitor = new LogGeometryVisitor();

    point.accept(visitor);

    expect(log).toHaveBeenCalledWith("Je suis un point avec x=2.0 et y=3.0.");
  });

  it("should visit a Point with decimals", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const point = new Point([2.5, 3.75]);
    const visitor = new LogGeometryVisitor();

    point.accept(visitor);

    expect(log).toHaveBeenCalledWith("Je suis un point avec x=2.5 et y=3.75.");
  });

  it("should visit an empty LineString", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const line = new LineString();
    const visitor = new LogGeometryVisitor();

    line.accept(visitor);

    expect(log).toHaveBeenCalledWith("Je suis une polyligne vide.");
  });

  it("should visit a LineString with 3 points", () => {
    const log = vi.spyOn(console, "log")
      .mockImplementation(() => {});

    const line = new LineString([
      new Point([0, 0]),
      new Point([1, 1]),
      new Point([5, 5])
    ]);

    const visitor = new LogGeometryVisitor();

    line.accept(visitor);

    expect(log).toHaveBeenCalledWith("Je suis une polyligne definie par 3 point(s).");
  });

  it("should use polymorphism with Geometry", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});

    const geometries: Geometry[] = [
      new Point([2, 3]),
      new LineString([
        new Point([0, 0]),
        new Point([1, 1])
      ])
    ];

    const visitor = new LogGeometryVisitor();

    geometries.forEach(g => g.accept(visitor));

    expect(log).toHaveBeenCalledTimes(2);

    expect(log).toHaveBeenNthCalledWith(1,"Je suis un point avec x=2.0 et y=3.0.");

    expect(log).toHaveBeenNthCalledWith(2,"Je suis une polyligne definie par 2 point(s).");
  });

});

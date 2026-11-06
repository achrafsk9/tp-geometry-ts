import type Point from "./Point";
import type LineString from "./LineString";

export default interface GeometryVisitor {
  visitPoint(point: Point): void;
  visitLineString(lineString: LineString): void;
}

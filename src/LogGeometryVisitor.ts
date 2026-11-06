
import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";

export default class LogGeometryVisitor implements GeometryVisitor {

  visitPoint(point: Point): void {
    if (point.isEmpty()) {
      console.log("Je suis un point vide.");
      return;
    }

    const x = this.formatNumber(point.x());
    const y = this.formatNumber(point.y());

    console.log(
      `Je suis un point avec x=${x} et y=${y}.`
    );
  }

  visitLineString(lineString: LineString): void {
    if (lineString.isEmpty()) {
      console.log("Je suis une polyligne vide.");
      return;
    }

    const count = lineString.getPoints().length;

    console.log(
      `Je suis une polyligne definie par ${count} point(s).`
    );
  }

  private formatNumber(value: number): string {
    return Number.isInteger(value)
      ? value.toFixed(1)
      : value.toString();
  }
}

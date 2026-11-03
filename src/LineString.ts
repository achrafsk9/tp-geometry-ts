
import Geometry from "./Geometry";
import Point from "./Point";

export default class LineString implements Geometry {
  private points: Point[];

  constructor(points?: Point[]) {
    this.points = points ?? [];
  }

  getPoints(): Point[] {
    return this.points;
  }

  getType(): string {
    return "LineString";
  }

  isEmpty(): boolean {
    return this.points.length === 0;
  }

  translate(dx: number, dy: number): void {
    this.points.forEach((point) => {
      point.translate(dx, dy);
    });
  }

  clone(): LineString {
    return new LineString(
      this.points.map(point => point.clone())
    );
  }

}

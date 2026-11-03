
import Geometry from "./Geometry";
import Point from "./Point";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";

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


  getEnvelope(): Envelope {
    const builder = new EnvelopeBuilder();

    this.points.forEach((point) => {
      builder.insert(point.getCoordinate());
    });

    return builder.build();
  }

}


import Coordinate from "./Coordinate";
import Envelope from "./Envelope";

export default class EnvelopeBuilder {
  private minX: number = Infinity;
  private minY: number = Infinity;
  private maxX: number = -Infinity;
  private maxY: number = -Infinity;

  private hasCoordinates: boolean = false;

  insert(coordinate: Coordinate): void {
    const [x, y] = coordinate;

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }

    this.minX = Math.min(this.minX, x);
    this.minY = Math.min(this.minY, y);
    this.maxX = Math.max(this.maxX, x);
    this.maxY = Math.max(this.maxY, y);

    this.hasCoordinates = true;
  }

  build(): Envelope {
    if (!this.hasCoordinates) {
      return new Envelope(NaN, NaN, NaN, NaN);
    }

    return new Envelope(
      this.minX,
      this.minY,
      this.maxX,
      this.maxY
    );
  }
}

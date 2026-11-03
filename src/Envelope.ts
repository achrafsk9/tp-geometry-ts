export default class Envelope {
  constructor(
    public readonly minX: number,
    public readonly minY: number,
    public readonly maxX: number,
    public readonly maxY: number
  ) {}

  toString(): string {
    return `[${this.minX},${this.minY},${this.maxX},${this.maxY}]`;
  }
}

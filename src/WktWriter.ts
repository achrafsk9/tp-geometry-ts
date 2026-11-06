
import Geometry from "./Geometry";
import Point from "./Point";
import LineString from "./LineString";

export default class WktWriter {

  write(geometry: Geometry): string {

    if (geometry instanceof Point) {

      if (geometry.isEmpty()) {
        return "POINT EMPTY";
      }

      const x = this.formatNumber(geometry.x());
      const y = this.formatNumber(geometry.y());

      return `POINT(${x} ${y})`;

    } else if (geometry instanceof LineString) {

      if (geometry.isEmpty()) {
        return "LINESTRING EMPTY";
      }

      const coordinates = geometry.getPoints()
        .map(point => {
          const x = this.formatNumber(point.x());
          const y = this.formatNumber(point.y());
          return `${x} ${y}`;
        })
        .join(",");

      return `LINESTRING(${coordinates})`;

    } else {
      throw new TypeError("geometry type not supported");
    }
  }

  private formatNumber(value: number): string {
    return Number.isInteger(value)
      ? value.toFixed(1)
      : value.toString();
  }
}

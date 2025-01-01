import { Point } from "./Point";
import { VirtualGridBoundaries } from "./VirtualGridBoundaries";

export type VirtualGrid = {
  boundaries: VirtualGridBoundaries;
  pointList: Array<Point>;
};

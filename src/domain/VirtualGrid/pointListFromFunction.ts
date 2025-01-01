import { Point } from "./Point";

export type PointListFromFunctionInput = {
  minX: number;
  maxX: number;
  steps: number;
  fn: (x: number) => number;
};

export const pointListFromFunction = ({
  maxX,
  minX,
  steps,
  fn,
}: PointListFromFunctionInput): Array<Point> => {
  const stepSize = (maxX - minX) / steps;

  const points = Array.from({ length: steps }).map((_, index) => {
    const x = minX + stepSize * index;
    const y = fn(x);

    return {
      x,
      y,
    };
  });

  return points;
};

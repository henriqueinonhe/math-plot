import { Point } from "../../domain/VirtualGrid/Point";
import { VirtualGridBoundaries } from "../../domain/VirtualGrid/VirtualGridBoundaries";
import { canvasToVirtualGridScaleFactors } from "./canvasToVirtualGridScaleFactors";

export type MapVirtualGridPointToCanvasCoordinatesInput = {
  context: CanvasRenderingContext2D;
  boundaries: VirtualGridBoundaries;
  point: Point;
};

export const mapVirtualGridPointToCanvasCoordinates = ({
  boundaries,
  context,
  point,
}: MapVirtualGridPointToCanvasCoordinatesInput) => {
  const { maxY: virtualGridMaxY, minX: virtualGridMinX } = boundaries;

  const { xScaleFactor, yScaleFactor } = canvasToVirtualGridScaleFactors({
    boundaries,
    context,
  });

  // Point Y is always smaller than Max Y
  const pointYDistanceFromMaxY = virtualGridMaxY - point.y;
  // Point X is always greater than Min X
  const pointXDistanceFromMinX = point.x - virtualGridMinX;

  const canvasMappedXPointCoordinate = pointXDistanceFromMinX * xScaleFactor;
  const canvasMappedYPointCoordinate = pointYDistanceFromMaxY * yScaleFactor;

  return {
    x: canvasMappedXPointCoordinate,
    y: canvasMappedYPointCoordinate,
  };
};

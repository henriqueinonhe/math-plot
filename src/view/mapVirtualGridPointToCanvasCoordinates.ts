import { Point } from "../domain/Point";
import { VirtualGridBoundaries } from "../domain/VirtualGridBoundaries";
import { getCanvasDimensions } from "./getCanvasDimensions";

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
  const {
    maxX: virtualGridMaxX,
    maxY: virtualGridMaxY,
    minX: virtualGridMinX,
    minY: virtualGridMinY,
  } = boundaries;

  // These calculations should be extracted out
  // to improve performance
  // BEGIN
  const { height: canvasHeight, width: canvasWidth } =
    getCanvasDimensions(context);

  const virtualGridHeight = virtualGridMaxY - virtualGridMinY;
  const virtualGridWidth = virtualGridMaxX - virtualGridMinX;

  const canvasToVirtualGridXScaleFactor = canvasWidth / virtualGridWidth;
  const canvasToVirtualGridYScaleFactor = canvasHeight / virtualGridHeight;
  // END

  // Point Y is always smaller than Max Y
  const pointYDistanceFromMaxY = virtualGridMaxY - point.y;
  // Point X is always greater than Min X
  const pointXDistanceFromMinX = point.x - virtualGridMinX;

  const canvasMappedXPointCoordinate =
    pointXDistanceFromMinX * canvasToVirtualGridXScaleFactor;
  const canvasMappedYPointCoordinate =
    pointYDistanceFromMaxY * canvasToVirtualGridYScaleFactor;

  return {
    x: canvasMappedXPointCoordinate,
    y: canvasMappedYPointCoordinate,
  };
};

import { VirtualGridBoundaries } from "../../domain/VirtualGrid/VirtualGridBoundaries";
import { getCanvasDimensions } from "./getCanvasDimensions";

export type CanvasToVirtualGridScaleFactorsInput = {
  context: CanvasRenderingContext2D;
  boundaries: VirtualGridBoundaries;
};

export const canvasToVirtualGridScaleFactors = ({
  boundaries,
  context,
}: CanvasToVirtualGridScaleFactorsInput) => {
  const {
    maxX: virtualGridMaxX,
    maxY: virtualGridMaxY,
    minX: virtualGridMinX,
    minY: virtualGridMinY,
  } = boundaries;

  // These calculations should be extracted out
  // to improve performance
  const { height: canvasHeight, width: canvasWidth } =
    getCanvasDimensions(context);

  const virtualGridHeight = virtualGridMaxY - virtualGridMinY;
  const virtualGridWidth = virtualGridMaxX - virtualGridMinX;

  const canvasToVirtualGridXScaleFactor = canvasWidth / virtualGridWidth;
  const canvasToVirtualGridYScaleFactor = canvasHeight / virtualGridHeight;

  return {
    xScaleFactor: canvasToVirtualGridXScaleFactor,
    yScaleFactor: canvasToVirtualGridYScaleFactor,
  };
};

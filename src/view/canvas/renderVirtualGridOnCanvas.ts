import { VirtualGrid } from "../../domain/VirtualGrid/VirtualGrid";
import { canvasToVirtualGridScaleFactors } from "./canvasToVirtualGridScaleFactors";
import { getCanvasDimensions } from "./getCanvasDimensions";
import { mapVirtualGridPointToCanvasCoordinates } from "./mapVirtualGridPointToCanvasCoordinates";

export const renderVirtualGridOnCanvas = (
  virtualGrid: VirtualGrid,
  context: CanvasRenderingContext2D,
) => {
  const { boundaries, pointList } = virtualGrid;

  pointList.forEach((point) => {
    const { x, y } = mapVirtualGridPointToCanvasCoordinates({
      boundaries,
      context,
      point,
    });

    context.fillRect(x, y, 1, 1);
  });

  // Render markers
  const { height: canvasHeight, width: canvasWidth } =
    getCanvasDimensions(context);

  const canvasYStepSize = 20;
  const canvasXStepSize = 30;
  const ySteps = Math.ceil(canvasHeight / canvasYStepSize);
  const xSteps = Math.ceil(canvasWidth / canvasXStepSize);

  const { minX: virtualGridMinX, minY: virtualGridMinY } = boundaries;
  const { xScaleFactor, yScaleFactor } = canvasToVirtualGridScaleFactors({
    boundaries,
    context,
  });

  Array.from({ length: ySteps }).map((_, index) => {
    const y = canvasYStepSize * index;

    const text = ySteps - index;
    context.fillText(text.toString(), 0, y);
  });

  Array.from({ length: xSteps }).map((_, index) => {
    const canvasX = canvasXStepSize * index;
    const x = virtualGridMinX + canvasX / xScaleFactor;

    context.fillText(x.toFixed(2), canvasX, canvasHeight);
  });
};

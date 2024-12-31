import { VirtualGrid } from "../domain/VirtualGrid";
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
};

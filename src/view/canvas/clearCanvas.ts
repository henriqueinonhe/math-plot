import { getCanvasDimensions } from "./getCanvasDimensions";

export const clearCanvas = (context: CanvasRenderingContext2D) => {
  const { height, width } = getCanvasDimensions(context);

  context.clearRect(0, 0, width, height);
};

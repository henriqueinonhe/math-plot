export const getCanvasDimensions = (context: CanvasRenderingContext2D) => {
  const width = context.canvas.width;
  const height = context.canvas.height;

  return {
    width,
    height,
  };
};

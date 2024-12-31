import { makeCanvas, makeDiv } from "named-components";
import { useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import { VirtualGrid } from "./domain/VirtualGrid";
import { pointListFromFunction } from "./domain/pointListFromFunction";
import { renderVirtualGridOnCanvas } from "./view/renderVirtualGridOnCanvas";
import { clearCanvas } from "./view/clearCanvas";
import { RangeControl } from "./view/RangeControl";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas Parameters
  const minCanvasWidth = 0;
  const maxCanvasWidth = 700;
  const canvasWidthStep = 1;
  const [canvasWidth, setCanvasWidth] = useState(300);

  const minCanvasHeight = 0;
  const maxCanvasHeight = 500;
  const canvasHeightStep = 1;
  const [canvasHeight, setCanvasHeight] = useState(150);

  // Virtual Grid Parameters
  const minMinX = -8 * Math.PI;
  const maxMinX = -2 * Math.PI;
  const minXStep = 0.1;
  const [minX, setMinX] = useState(-2 * Math.PI);

  const minMaxX = 2 * Math.PI;
  const maxMaxX = 8 * Math.PI;
  const maxXStep = 0.1;
  const [maxX, setMaxX] = useState(2 * Math.PI);

  const minMinY = -4;
  const maxMinY = -2;
  const minYStep = 0.1;
  const [minY, setMinY] = useState(-2);

  const minMaxY = 2;
  const maxMaxY = 4;
  const maxYStep = 0.1;
  const [maxY, setMaxY] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current!;

    const context = canvas.getContext("2d")!;

    const resolutionFactor = 5;
    const steps = resolutionFactor * Math.round(canvasWidth);

    // const rolls = 50;
    // const probability = (headCount: number) => {
    //   return Math.pow(0.5, rolls - headCount) * Math.pow(0.5, headCount)
    // }

    const pointList = pointListFromFunction({
      minX,
      maxX,
      steps,
      fn: (x: number) => Math.sin(x),
    });

    const virtualGrid: VirtualGrid = {
      boundaries: {
        minX,
        maxX,
        minY,
        maxY,
      },
      pointList,
    };

    clearCanvas(context);
    renderVirtualGridOnCanvas(virtualGrid, context);
  }, [canvasWidth, canvasHeight, minX, maxX, minY, maxY]);

  return (
    <>
      <Canvas height={canvasHeight} width={canvasWidth} ref={canvasRef} />

      <Controls>
        <RangeControl
          label="Canvas Width:"
          min={minCanvasWidth}
          max={maxCanvasWidth}
          step={canvasWidthStep}
          value={canvasWidth}
          onChange={setCanvasWidth}
        />

        <RangeControl
          label="Canvas Height:"
          min={minCanvasHeight}
          max={maxCanvasHeight}
          step={canvasHeightStep}
          value={canvasHeight}
          onChange={setCanvasHeight}
        />

        <RangeControl
          label="Min X:"
          min={minMinX}
          max={maxMinX}
          step={minXStep}
          value={minX}
          onChange={setMinX}
        />

        <RangeControl
          label="Max X:"
          min={minMaxX}
          max={maxMaxX}
          step={maxXStep}
          value={maxX}
          onChange={setMaxX}
        />

        <RangeControl
          label="Min Y:"
          min={minMinY}
          max={maxMinY}
          step={minYStep}
          value={minY}
          onChange={setMinY}
        />

        <RangeControl
          label="Max Y:"
          min={minMaxY}
          max={maxMaxY}
          step={maxYStep}
          value={maxY}
          onChange={setMaxY}
        />
      </Controls>
    </>
  );
}

const Canvas = makeCanvas(styles.canvas);

const Controls = makeDiv(styles.controls);

export default App;

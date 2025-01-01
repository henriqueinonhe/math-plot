import { makeCanvas, makeDiv } from "named-components";
import { useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import { VirtualGrid } from "./domain/VirtualGrid";
import { pointListFromFunction } from "./domain/pointListFromFunction";
import { renderVirtualGridOnCanvas } from "./view/renderVirtualGridOnCanvas";
import { clearCanvas } from "./view/clearCanvas";
import { RangeControl } from "./view/RangeControl";
import BigNumber from "bignumber.js";
import { bigNumberBinomialCoefficient } from "./domain/BigNumber/bigNumberBinomialCoefficient";

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
  const minMinX = 0;
  const maxMinX = 0;
  const minXStep = 0.1;
  const [minX, setMinX] = useState(0);

  const minMaxX = 0;
  const maxMaxX = 1;
  const maxXStep = 0.01;
  const [maxX, setMaxX] = useState(1);

  const minMinY = 0;
  const maxMinY = 0;
  const minYStep = 0.1;
  const [minY, setMinY] = useState(0);

  const minMaxY = 0;
  const maxMaxY = 1;
  const maxYStep = 0.001;
  const [maxY, setMaxY] = useState(1);

  // Function Parameters
  const minRolls = 2;
  const maxRolls = 100;
  const rollsStep = 1;
  const [rolls, setRolls] = useState(50);

  const minHeads = 0;
  const maxHeads = maxRolls;
  const headsStep = 1;
  const [heads, setHeads] = useState(25);

  const minHeadsProbability = 0;
  const maxHeadsProbability = 1;
  const headsProbabilityStep = 0.01;
  const [headsProbability, setHeadsProbability] = useState(0.5);

  const minTailsProbability = 0;
  const maxTailsProbability = 1;
  const tailsProbabilityStep = 0.01;
  const tailsProbability = 1 - headsProbability;
  const setTailsProbability = (value: number) => setHeadsProbability(1 - value);

  useEffect(() => {
    const canvas = canvasRef.current!;

    const context = canvas.getContext("2d")!;

    const resolutionFactor = 5;
    const steps = resolutionFactor * Math.round(canvasWidth);

    // const probability = (headCount: number) => {
    //   return BigNumber(headsProbability)
    //     .pow(headCount)
    //     .times(BigNumber(tailsProbability).pow(rolls - headCount))
    //     .times(
    //       bigNumberBinomialCoefficient(BigNumber(rolls), BigNumber(headCount)),
    //     );
    // };

    const probability = (p: number) => {
      return BigNumber(p)
        .pow(heads)
        .times(BigNumber(1 - p).pow(rolls - heads))
        .times(
          bigNumberBinomialCoefficient(BigNumber(rolls), BigNumber(heads)),
        );
    };

    const pointList = pointListFromFunction({
      minX,
      maxX,
      steps,
      fn: (x: number) => probability(x).toNumber(),
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
  }, [
    canvasWidth,
    canvasHeight,
    minX,
    maxX,
    minY,
    maxY,
    rolls,
    heads,
    headsProbability,
  ]);

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

        <RangeControl
          label="Rolls:"
          min={minRolls}
          max={maxRolls}
          step={rollsStep}
          value={rolls}
          onChange={setRolls}
        />

        <RangeControl
          label="Heads:"
          min={minHeads}
          max={maxHeads}
          step={headsStep}
          value={heads}
          onChange={setHeads}
        />

        <RangeControl
          label="Heads Probability:"
          min={minHeadsProbability}
          max={maxHeadsProbability}
          step={headsProbabilityStep}
          value={headsProbability}
          onChange={setHeadsProbability}
        />

        <RangeControl
          label="Tails Probability:"
          min={minTailsProbability}
          max={maxTailsProbability}
          step={tailsProbabilityStep}
          value={tailsProbability}
          onChange={setTailsProbability}
        />
      </Controls>
    </>
  );
}

const Canvas = makeCanvas(styles.canvas);

const Controls = makeDiv(styles.controls);

export default App;

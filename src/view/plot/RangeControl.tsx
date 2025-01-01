import { makeDiv, makeInput, makeLabel } from "named-components";
import styles from "./RangeControl.module.scss";
import { useId } from "react";

export type RangeControlProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
};

export const RangeControl = ({
  label,
  max,
  min,
  step,
  onChange,
  value,
}: RangeControlProps) => {
  const id = useId();

  return (
    <Container>
      <Label htmlFor={id}>
        {label} ({value})
      </Label>

      <Input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(parseFloat(event.target.value))}
      />
    </Container>
  );
};

const Container = makeDiv(styles.container);

const Label = makeLabel(styles.label);

const Input = makeInput(styles.input);

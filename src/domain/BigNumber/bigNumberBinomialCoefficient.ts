import BigNumber from "bignumber.js";
import { bigNumberFactorial } from "./bigNumberFactorial";

export const bigNumberBinomialCoefficient = (n: BigNumber, k: BigNumber) => {
  return bigNumberFactorial(n).div(
    bigNumberFactorial(n.minus(k)).times(bigNumberFactorial(k)),
  );
};

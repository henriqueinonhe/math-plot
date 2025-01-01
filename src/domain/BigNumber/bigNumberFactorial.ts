import BigNumber from "bignumber.js";

export const bigNumberFactorial = (n: BigNumber): BigNumber => {
  if (n.isEqualTo(BigNumber(0))) {
    return BigNumber(1);
  }

  let i = BigNumber(1);
  let result = BigNumber(1);
  while (i.lte(n)) {
    result = result.times(i);
    i = i.plus(1);
  }

  return result;
};

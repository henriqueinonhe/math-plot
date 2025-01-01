import BigNumber from "bignumber.js";

export const bigNumberSummation = (
  inf: BigNumber,
  sup: BigNumber,
  f: (x: BigNumber) => BigNumber,
): BigNumber => {
  let i = inf;
  let result = BigNumber(0);
  while (i.lte(sup)) {
    result = result.plus(f(i));
    i = i.plus(1);
  }

  return result;
};

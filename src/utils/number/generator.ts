export function* generateDecimalsAndOnes(num: number): Generator<number> {
  let decimal = num % 1;

  while (num > 1) {
    const toYield = 1 + decimal;

    yield toYield;

    num -= toYield;
    decimal = 0;
  }

  if (num) {
    yield num;
  }
}

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

type GenerateNumberTicksOpts = {
  max: number,
  interval: number,
  start?: number,
};

export function* generateNumberTicks({max, interval, start}: GenerateNumberTicksOpts): Generator<number> {
  let current = start ?? 0;
  yield current;

  while (current < max) {
    current += interval;
    yield current;
  }
}

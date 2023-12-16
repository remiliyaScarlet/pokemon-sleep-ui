type GenerateTicksOpts = {
  max: number,
  interval: number,
  start?: number,
};

export const generateTicks = ({max, interval, start}: GenerateTicksOpts): number[] => {
  let current = start ?? 0;
  const ticks: number[] = [current];

  while (current < max) {
    current += interval;
    ticks.push(current);
  }

  return ticks;
};

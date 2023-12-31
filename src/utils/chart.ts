type GenerateTicksFromDataOpts = {
  data: number[],
  count: number,
};

export const generateTicksFromData = ({data, count}: GenerateTicksFromDataOpts): number[] => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const interval = (max - min) / (count - 1);

  const ticks: number[] = [min];

  let current = min;

  while (Math.abs(current - max) > 1E-6) {
    current += interval;
    ticks.push(current);
  }

  return ticks;
};

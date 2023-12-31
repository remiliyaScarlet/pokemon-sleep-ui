import {generateNumberTicks} from '@/utils/number/generator';
import {formatSeconds, rotateTime} from '@/utils/time';


type GenerateTimingTicksOpts = {
  max: number,
  isLandscape: boolean,
};

export const generateTimingTicks = ({
  max,
  isLandscape,
}: GenerateTimingTicksOpts): number[] => [...generateNumberTicks({
  max,
  // 4/8 is (the number of the ticks to show - 1)
  interval: Math.ceil(max / (isLandscape ? 8 : 4) / 1800) * 1800,
})];

export const generateStaminaTicks = (max: number): number[] => (
  [...generateNumberTicks({max, interval: 20})]
);

type ToFormattedTimeFromTimingOpts = {
  start: number,
  timing: number,
};

export const toFormattedTimeFromTiming = ({start, timing}: ToFormattedTimeFromTimingOpts): string => {
  return formatSeconds({
    seconds: rotateTime(start + timing),
    omitSeconds: true,
  });
};

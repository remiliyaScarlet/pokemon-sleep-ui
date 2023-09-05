import {durationOfDay} from '@/const/common';


export const rotateTime = (time: number): number => {
  return (time + durationOfDay) % durationOfDay;
};

export const toTimeString = (seconds: number): string => {
  return new Date(rotateTime(seconds) * 1000).toISOString().substring(11, 16);
};

export const toSeconds = (time: string): number => {
  const [h, m] = time.split(':');

  return (+h) * 3600 + (+m) * 60;
};

import {durationOfDay} from '@/const/common';


export const rotateTime = (time: number): number => {
  return (time + durationOfDay) % durationOfDay;
};

export const toTimeString = (seconds: number): string => {
  return new Date(rotateTime(seconds) * 1000).toISOString().substring(11, 16);
};

export const toSeconds = (time: string): number => {
  if (!time) {
    return 0;
  }

  const [h, m] = time.split(':');

  return (+h) * 3600 + (+m) * 60;
};

export const formatSeconds = (seconds: number): string => {
  if (seconds === Infinity) {
    return '∞';
  }

  if (seconds === -Infinity) {
    return '-∞';
  }

  if (isNaN(seconds)) {
    return 'NaN';
  }

  const h = Math.floor(seconds / 3600).toString();
  const m = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 3600 % 60).toString().padStart(2, '0');

  return `${h}:${m}:${s}`;
};

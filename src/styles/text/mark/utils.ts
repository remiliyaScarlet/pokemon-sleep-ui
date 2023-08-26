import {TextMarkStyle, TextMarkThreshold} from '@/styles/text/mark/type';


export const getMarkByThreshold = (
  value: number,
  threshold: TextMarkThreshold | undefined,
): TextMarkStyle | undefined => {
  if (threshold?.superRare && value > threshold.superRare) {
    return 'superRare';
  }

  if (threshold?.rare && value > threshold.rare) {
    return 'rare';
  }

  if (threshold?.ordinary && value < threshold.ordinary) {
    return 'ordinary';
  }

  return undefined;
};

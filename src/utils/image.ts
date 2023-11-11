import {Pixel} from '@/types/image';


export type IsRgbInRangeOpts = {
  basis: Pixel,
  pixel: Pixel,
  range: number,
};

export const isRgbInRange = ({basis, pixel, range}: IsRgbInRangeOpts) => (
  Math.abs(basis.r - pixel.r) <= range &&
  Math.abs(basis.g - pixel.g) <= range &&
  Math.abs(basis.b - pixel.b) <= range
);

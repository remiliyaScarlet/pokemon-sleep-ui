import {ocrAllowedPixels} from '@/components/ocr/const';
import {Pixel} from '@/types/image';
import {isRgbInRange} from '@/utils/image';


export type OcrThresholdPixelOpts = {
  pixel: Pixel,
  tolerance: number,
};

export const ocrThresholdPixel = ({pixel, tolerance}: OcrThresholdPixelOpts): boolean => {
  for (const basis of ocrAllowedPixels) {
    if (isRgbInRange({basis, pixel, range: tolerance})) {
      return true;
    }
  }

  return false;
};

type OcrThresholdImageOpts = {
  imageData: ImageData,
  tolerance: number,
};

export const ocrThresholdImage = ({imageData, tolerance}: OcrThresholdImageOpts) => {
  const d = imageData.data;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];

    const v = ocrThresholdPixel({pixel: {r, g, b}, tolerance});
    d[i] = d[i + 1] = d[i + 2] = v ? 0 : 255;
  }

  return imageData;
};

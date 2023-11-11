import {ocrAllowedPixels} from '@/components/ocr/const';
import {Pixel} from '@/types/image';
import {isRgbInRange} from '@/utils/image';


export type OcrThresholdPixelOpts = {
  pixel: Pixel,
};

export const ocrThresholdPixel = ({pixel}: OcrThresholdPixelOpts): boolean => {
  for (const allowedPixel of ocrAllowedPixels) {
    if (isRgbInRange({...allowedPixel, pixel})) {
      return true;
    }
  }

  return false;
};

type OcrThresholdImageOpts = {
  imageData: ImageData,
};

export const ocrThresholdImage = ({imageData}: OcrThresholdImageOpts) => {
  const d = imageData.data;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];

    const v = ocrThresholdPixel({pixel: {r, g, b}});
    d[i] = d[i + 1] = d[i + 2] = v ? 255 : 0;
  }

  return imageData;
};

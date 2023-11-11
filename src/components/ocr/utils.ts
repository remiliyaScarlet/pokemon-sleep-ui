type OcrThresholdPixelOpts = {
  r: number,
  g: number,
  b: number,
};

export const ocrThresholdPixel = ({r, g, b}: OcrThresholdPixelOpts) => {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b >= 180) ? 255 : 0;
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

    const v = ocrThresholdPixel({r, g, b});
    d[i] = d[i + 1] = d[i + 2] = v;
  }

  return imageData;
};

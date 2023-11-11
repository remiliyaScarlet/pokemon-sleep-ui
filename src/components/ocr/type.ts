import React from 'react';

import {Pixel} from '@/types/image';
import {OcrLocale} from '@/types/ocr/locale';


export type OcrState = {
  status: 'ready' | 'thresholding' | 'loadingOcr',
  progress: 0,
  text: null,
} | {
  status: 'recognizing',
  progress: number,
  text: null,
} | {
  status: 'completed',
  progress: 100,
  text: string,
};

export type OcrStatus = OcrState['status'];

export type OcrRenderDataOpts<TData> = {
  data: TData,
  text: string,
  image: string | null,
};

export type OcrCommonProps<TData> = {
  buttonText: string,
  textToData: (text: string, locale: OcrLocale) => TData,
  renderData: (opts: OcrRenderDataOpts<TData>) => React.ReactNode,
};

export type OcrAllowedPixel = {
  basis: Pixel,
  range: number,
};

export type UseOcrReturn = {
  state: OcrState,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageRef: React.RefObject<HTMLImageElement>,
  runOcr: () => Promise<void>,
};

import React from 'react';

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

export type OcrCommonProps<TData> = {
  buttonText: string,
  textToData: (text: string, locale: OcrLocale) => TData,
  renderData: (data: TData) => React.ReactNode,
};

export type UseOcrReturn = {
  state: OcrState,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageRef: React.RefObject<HTMLImageElement>,
  runOcr: () => Promise<void>,
};

import {OcrStatus} from '@/components/ocr/type';


export const isOcrRunning = (status: OcrStatus): boolean => {
  return status !== 'ready' && status !== 'completed';
};

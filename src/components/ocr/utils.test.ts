import {describe, expect, it} from '@jest/globals';

import {ocrThresholdPixel} from '@/components/ocr/utils';


describe('OCR / Image Thresholding', () => {
  it('thresholds active white subskill', () => {
    expect(ocrThresholdPixel({pixel: {r: 105, g: 49, b: 16}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 105, g: 49, b: 16}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 107, g: 48, b: 16}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 105, g: 48, b: 18}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 104, g: 50, b: 16}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 104, g: 48, b: 15}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 105, g: 49, b: 14}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 104, g: 48, b: 13}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 105, g: 51, b: 17}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 106, g: 50, b: 17}, tolerance: 6})).toBeTruthy();
  });

  it('thresholds inactive white subskill', () => {
    expect(ocrThresholdPixel({pixel: {r: 182, g: 171, b: 167}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 183, g: 172, b: 168}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 182, g: 171, b: 167}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 182, g: 171, b: 167}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 183, g: 172, b: 168}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 183, g: 172, b: 166}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 183, g: 172, b: 168}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 184, g: 170, b: 167}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 183, g: 175, b: 172}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 182, g: 171, b: 167}, tolerance: 6})).toBeTruthy();
  });

  it('thresholds active blue subskill', () => {
    expect(ocrThresholdPixel({pixel: {r: 5, g: 18, b: 62}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 6, g: 19, b: 63}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 6, g: 19, b: 61}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 8, g: 21, b: 65}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 6, g: 19, b: 61}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 5, g: 20, b: 63}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 3, g: 20, b: 63}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 4, g: 19, b: 62}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 5, g: 20, b: 61}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 7, g: 20, b: 64}, tolerance: 6})).toBeTruthy();
  });

  it('thresholds inactive active blue subskill', () => {
    expect(ocrThresholdPixel({pixel: {r: 158, g: 165, b: 175}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 157, g: 164, b: 174}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 157, g: 164, b: 174}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 157, g: 164, b: 174}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 156, g: 163, b: 177}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 158, g: 165, b: 175}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 152, g: 159, b: 167}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 156, g: 165, b: 176}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 155, g: 165, b: 175}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 156, g: 164, b: 175}, tolerance: 6})).toBeTruthy();
  });

  it('thresholds active gold subskill', () => {
    expect(ocrThresholdPixel({pixel: {r: 114, g: 46, b: 1}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 114, g: 46, b: 0}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 114, g: 45, b: 0}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 113, g: 45, b: 0}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 114, g: 46, b: 1}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 114, g: 46, b: 0}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 114, g: 45, b: 3}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 112, g: 45, b: 0}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 116, g: 45, b: 1}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 115, g: 47, b: 2}, tolerance: 6})).toBeTruthy();
  });

  it('thresholds inactive gold subskill', () => {
    expect(ocrThresholdPixel({pixel: {r: 187, g: 162, b: 122}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 181, g: 163, b: 127}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 182, g: 164, b: 126}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 181, g: 165, b: 129}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 188, g: 163, b: 124}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 188, g: 163, b: 123}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 188, g: 163, b: 124}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 188, g: 163, b: 123}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 187, g: 163, b: 123}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 187, g: 164, b: 123}, tolerance: 6})).toBeTruthy();
  });

  it('thresholds nature', () => {
    expect(ocrThresholdPixel({pixel: {r: 68, g: 68, b: 68}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 69, g: 69, b: 71}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 67, g: 67, b: 67}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 66, g: 66, b: 66}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 71, g: 71, b: 71}, tolerance: 6})).toBeTruthy();
    expect(ocrThresholdPixel({pixel: {r: 69, g: 69, b: 69}, tolerance: 6})).toBeTruthy();
  });
});

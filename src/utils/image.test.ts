import {describe, expect, it} from '@jest/globals';

import {Pixel} from '@/types/image';
import {isRgbInRange} from '@/utils/image';


describe('Image / RGB in Range', () => {
  const basis: Pixel = {
    r: 100,
    g: 100,
    b: 100,
  };

  it('is in range if exactly matches the basis', () => {
    const inRange = isRgbInRange({
      basis,
      pixel: basis,
      range: 7,
    });

    expect(inRange).toBeTruthy();
  });

  it('is in range on the lower bound', () => {
    const inRange = isRgbInRange({
      basis,
      pixel: {
        ...basis,
        r: 93,
      },
      range: 7,
    });

    expect(inRange).toBeTruthy();
  });

  it('is in range on the upper bound', () => {
    const inRange = isRgbInRange({
      basis,
      pixel: {
        ...basis,
        r: 107,
      },
      range: 7,
    });

    expect(inRange).toBeTruthy();
  });

  it('is out of range if lower than the lower bound', () => {
    const inRange = isRgbInRange({
      basis,
      pixel: {
        ...basis,
        r: 90,
      },
      range: 7,
    });

    expect(inRange).toBeFalsy();
  });

  it('is out of range if higher than the upper bound', () => {
    const inRange = isRgbInRange({
      basis,
      pixel: {
        ...basis,
        r: 110,
      },
      range: 7,
    });

    expect(inRange).toBeFalsy();
  });
});

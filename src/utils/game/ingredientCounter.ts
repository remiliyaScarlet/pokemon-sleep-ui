import groupBy from 'lodash/groupBy';

import {IngredientCounter} from '@/types/game/ingredient';
import {toSum} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


export const subtractIngredientCount = (
  minuend: IngredientCounter,
  subtrahend: IngredientCounter,
): IngredientCounter => (
  Object.fromEntries(Object.entries(minuend).map(([id, count]) => {
    if (!count) {
      return null;
    }

    const result = count - (subtrahend[parseInt(id)] ?? 0);

    if (result < 0) {
      return null;
    }

    return [id, result];
  }).filter(isNotNullish))
);

export const addIngredientCount = (addends: IngredientCounter[]): IngredientCounter => {
  const grouped = groupBy(
    addends.flatMap((addend) => (
      Object.entries(addend)
        .map(([id, quantity]) => {
          if (!quantity) {
            return null;
          }

          return {id: parseInt(id), quantity};
        })
        .filter(isNotNullish)
    )),
    ({id}) => id,
  );

  return Object.fromEntries(
    Object.entries(grouped).map(([id, data]) => (
      [id, toSum(data.map(({quantity}) => quantity))]
    )),
  );
};

export const isIngredientCounterEmpty = (counter: IngredientCounter): boolean => {
  return Object.values(counter).every((count) => !count);
};

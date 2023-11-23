import React from 'react';

import {Meal, MealTypeId} from '@/types/game/meal/main';
import {toUnique} from '@/utils/array';


export const usePossibleMealTypes = (meals: Meal[]): MealTypeId[] => React.useMemo(
  () => toUnique(meals.map(({type}) => type)).sort((a, b) => a - b),
  [meals],
);

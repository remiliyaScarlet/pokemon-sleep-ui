import React from 'react';

import {Meal, MealId, MealTypeId} from '@/types/mongo/meal';


export type CookingInput = {
  type: MealTypeId,
  capacity: number,
  recipeLevel: {[id in MealId]?: number},
};

export type CookingCommonProps = {
  input: CookingInput,
  setInput: React.Dispatch<React.SetStateAction<CookingInput>>,
  meals: Meal[],
  mealTypes: MealTypeId[],
};

export type CookingRecipeLayoutProps = {
  mealId: number,
  imageSizeClass: string,
  clickable: boolean,
};

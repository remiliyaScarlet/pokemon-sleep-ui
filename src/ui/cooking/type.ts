import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId, IngredientMap} from '@/types/mongo/ingredient';
import {Meal, MealId, MealTypeId} from '@/types/mongo/meal';


export type CookingFilter = {
  type: MealTypeId,
  recipeLevel: {[id in MealId]?: number},
  capacity: number,
  ingredient: FilterInclusionMap<IngredientId>,
};

export type CookingCommonProps = {
  filter: CookingFilter,
  setFilter: React.Dispatch<React.SetStateAction<CookingFilter>>,
  meals: Meal[],
  mealTypes: MealTypeId[],
  ingredients: IngredientMap,
};

export type CookingRecipeLayoutProps = {
  mealId: number,
  imageSizeClass: string,
  clickable: boolean,
};

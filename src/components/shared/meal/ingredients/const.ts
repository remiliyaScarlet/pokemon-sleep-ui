import {IngredientIconMark} from '@/components/shared/meal/ingredients/type';


export const ingredientIconMarkToStyle: {[mark in IngredientIconMark]: string} = {
  green: 'text-safe',
  red: 'text-danger',
};

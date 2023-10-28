import {CookingRecipeInfo, CookingRecipeSingleProps} from '@/ui/cooking/recipe/type';


export type CookingRecipePartsProps = CookingRecipeInfo & CookingRecipeSingleProps & {
  mealName: string,
};

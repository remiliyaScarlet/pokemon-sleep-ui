import {UserCookingPreset} from '@/types/userData/cooking';
import {CookingCommonFilter} from '@/ui/cooking/common/type';


export const generateCookingCommonFilter = ({
  recipeLevel,
  ingredientCount,
  mealsMarked,
}: UserCookingPreset): CookingCommonFilter => ({
  recipeLevel,
  mealsMarked,
  inventory: ingredientCount,
});

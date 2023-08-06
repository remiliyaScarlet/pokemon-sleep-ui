import {FilterInclusionMap, FilterInputProps} from '@/components/input/filter/type';
import {IngredientId, IngredientMap} from '@/types/mongo/ingredient';
import {Meal, MealId, MealTypeId} from '@/types/mongo/meal';
import {Dimension} from '@/types/style';


export type CookingFilterRecipeLevel = {[id in MealId]?: number};

export type CookingFilter = {
  type: MealTypeId,
  recipeLevel: CookingFilterRecipeLevel,
  capacity: number,
  ingredient: FilterInclusionMap<IngredientId>,
};

export type CookingCommonProps = FilterInputProps<CookingFilter> & {
  meals: Meal[],
  mealTypes: MealTypeId[],
  ingredientMap: IngredientMap,
};

export type CookingRecipeLayoutProps = {
  imageDimension: Dimension,
  clickable: boolean,
  mealId: number,
};

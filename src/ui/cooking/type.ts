import {FilterInclusionMap, FilterInputProps} from '@/components/input/filter/type';
import {IngredientId, IngredientMap} from '@/types/mongo/ingredient';
import {Meal, MealId, MealTypeId} from '@/types/mongo/meal';
import {Dimension} from '@/types/style';
import {MealEnergyInfo} from '@/utils/game/meal';


export type MealEnergyData = {
  meal: Meal,
  energyInfo: MealEnergyInfo,
};

export type CookingFilterRecipeLevel = {[id in MealId]?: number};

export type CookingFilterIngredientCount = {[ingredient in IngredientId]?: number | null};

export type CookingFilter = {
  type: MealTypeId,
  recipeLevel: CookingFilterRecipeLevel,
  capacity: number,
  ingredient: FilterInclusionMap<IngredientId>,
  ingredientCount: CookingFilterIngredientCount,
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
  markGray?: boolean,
};

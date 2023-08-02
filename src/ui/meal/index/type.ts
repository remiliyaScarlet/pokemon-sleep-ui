import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId} from '@/types/mongo/ingredient';
import {MealTypeId} from '@/types/mongo/meal';


export type MealFilter = {
  mealType: FilterInclusionMap<MealTypeId>,
  ingredient: FilterInclusionMap<IngredientId>,
  ingredientCountCap: number | null,
};

import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId} from '@/types/mongo/ingredient';
import {Meal, MealTypeId} from '@/types/mongo/meal';


export type MealFilter = {
  type: FilterInclusionMap<MealTypeId>,
  ingredient: FilterInclusionMap<IngredientId>,
  ingredientCountCap: number | null,
};

export type MealLinkProps = Meal;

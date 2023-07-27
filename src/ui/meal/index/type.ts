import {FilterInclusionMap} from '@/components/input/filter/type';
import {Meal, MealTypeId} from '@/types/mongo/meal';
import {PokemonIngredientId} from '@/types/mongo/pokemon';


export type MealFilter = {
  type: FilterInclusionMap<MealTypeId>,
  ingredient: FilterInclusionMap<PokemonIngredientId>,
  ingredientCountCap: number | null,
};

export type MealLinkProps = Meal;

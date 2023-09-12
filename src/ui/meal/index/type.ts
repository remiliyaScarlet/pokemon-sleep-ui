import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal';
import {Migratable} from '@/types/migrate';


export type MealFilter = Migratable & {
  mealType: FilterInclusionMap<MealTypeId>,
  mealLevel: number,
  ingredient: FilterInclusionMap<IngredientId>,
  potCapacity: number | null,
  showEnergy: boolean,
};

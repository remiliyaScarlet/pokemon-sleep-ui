import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {Meal, MealTypeId} from '@/types/game/meal';
import {Migratable} from '@/types/migrate';
import {UserPreloadedData} from '@/types/userData/main';
import {UserSettings} from '@/types/userData/settings';


export type MealFilter = Migratable & {
  mealType: FilterInclusionMap<MealTypeId>,
  mealLevel: number,
  ingredient: FilterInclusionMap<IngredientId>,
  potCapacity: number | null,
  showEnergy: boolean,
};

export type MealDataProps = {
  meals: Meal[],
  ingredientMap: IngredientMap,
  preloaded: {
    cooking: UserPreloadedData['cooking'],
    settings: UserSettings,
  },
};

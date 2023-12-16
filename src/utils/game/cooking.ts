import {productionMultiplierByPeriod} from '@/const/game/production';
import {IngredientCounter, IngredientId} from '@/types/game/ingredient';
import {Meal, MealIngredient} from '@/types/game/meal/main';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';
import {ProductionPeriod} from '@/types/game/producing/display';
import {toSum} from '@/utils/array';
import {applyMultiplierToIngredientCount, capIngredientCount} from '@/utils/game/ingredientCounter';
import {getMealIngredientInfoFromTargetMeals} from '@/utils/game/meal/ingredient';
import {isNotNullish} from '@/utils/type';


export const toMealIngredientFromIngredientCounter = (ingredientCount: IngredientCounter): MealIngredient[] => {
  return Object.entries(ingredientCount)
    .map(([id, quantity]) => {
      if (!quantity) {
        return null;
      }

      return {id: parseInt(id), quantity};
    })
    .filter(isNotNullish);
};

export const toProducingItemFromIngredientCounter = (
  ingredientCount: IngredientCounter,
): PokemonProducingItem<IngredientId>[] => {
  return Object.entries(ingredientCount)
    .map(([id, qty]) => {
      if (!qty) {
        return null;
      }

      return {id: parseInt(id), qty};
    })
    .filter(isNotNullish);
};

export const toIngredientCounterFromMealIngredient = (ingredients: MealIngredient[]): IngredientCounter => (
  Object.fromEntries(ingredients.map(({id, quantity}) => [id, quantity]))
);

export const getMealIngredientsRequiredCommon = (counters: IngredientCounter[]): IngredientCounter => {
  if (!counters.length) {
    return {};
  }

  const ret: IngredientCounter = {...counters[0]};

  for (const counter of counters.slice(1)) {
    for (const [id, count] of Object.entries(counter)) {
      const ingredientId = parseInt(id);

      ret[ingredientId] = Math.max(ret[ingredientId] ?? 0, count ?? 0);
    }
  }

  return ret;
};

type GetMealCoverageOpts = {
  meals: Meal[],
  ingredientProduction: IngredientCounter,
  period: ProductionPeriod,
};

export const getMealCoverage = ({
  meals,
  ingredientProduction,
  period,
}: GetMealCoverageOpts): number => {
  const dailyProduction = applyMultiplierToIngredientCount(
    productionMultiplierByPeriod.daily / productionMultiplierByPeriod[period],
    ingredientProduction,
  );
  const {ingredientsRequired} = getMealIngredientInfoFromTargetMeals({
    targetMeals: meals,
    days: 1,
  });

  const totalIngredientsUsed = toSum(
    Object.values(capIngredientCount(ingredientsRequired, dailyProduction)).filter(isNotNullish),
  );
  const totalIngredientsRequired = toSum(Object.values(ingredientsRequired).filter(isNotNullish));

  return totalIngredientsUsed / totalIngredientsRequired;
};

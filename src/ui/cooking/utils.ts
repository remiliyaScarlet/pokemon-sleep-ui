import {Meal} from '@/types/mongo/meal';


type GetMealEnergyOpts = {
  meal: Meal,
  recipeLevel: number,
};

export const getMealEnergy = ({meal, recipeLevel}: GetMealEnergyOpts): number | null => {
  const mealLevelData = meal.levels.find(({lv}) => lv === recipeLevel);

  if (!mealLevelData) {
    return null;
  }

  return mealLevelData.energy;
};

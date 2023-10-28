import {defaultCookingPreset} from '@/const/user/cooking';
import {createUserDataManager} from '@/controller/user/common';
import {userDataCooking} from '@/controller/user/manager';
import {MealTypeId} from '@/types/game/meal/main';
import {UserCookingPreset} from '@/types/userData/cooking';
import {CookingIngredientCount, CookingFilterRecipeLevel} from '@/ui/cooking/type';


const userDataRecipeLevel = createUserDataManager<CookingFilterRecipeLevel>('recipeLevel');

const userDataPotCapacity = createUserDataManager<number>('potCapacity');

const userDataMealType = createUserDataManager<MealTypeId>('mealType');

const userDataIngredientCount = createUserDataManager<CookingIngredientCount>('ingredientCount');

export const migrateUserCookingData = async (userId: string) => {
  const [
    mealType,
    recipeLevel,
    potCapacity,
    ingredientCount,
  ] = await Promise.all([
    userDataMealType.getData(userId),
    userDataRecipeLevel.getData(userId),
    userDataPotCapacity.getData(userId),
    userDataIngredientCount.getData(userId),
  ]);

  const newPreset: UserCookingPreset = {
    ...defaultCookingPreset,
    mealType: mealType?.data ?? defaultCookingPreset.mealType,
    recipeLevel: recipeLevel?.data ?? defaultCookingPreset.recipeLevel,
    potCapacity: potCapacity?.data ?? defaultCookingPreset.potCapacity,
    ingredientCount: ingredientCount?.data ?? defaultCookingPreset.ingredientCount,
  };

  await userDataCooking.setData(userId, newPreset);
};

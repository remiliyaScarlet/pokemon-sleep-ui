import {updateUserPokebox} from '@/controller/pokebox';
import {
  userDataIngredientCount,
  userDataMealType,
  userDataPokedex,
  userDataPotCapacity,
  userDataRecipeLevel,
  userDataTeamAnalysisSetup,
} from '@/controller/user/manager';
import {UploadUserDataOpts, UserData} from '@/types/userData';


export const uploadUserData = async ({userId, opts}: {userId: string, opts: UploadUserDataOpts}) => {
  const {type, data} = opts;

  if (type === 'cooking' || type === 'potInfo') {
    const promises: Promise<void>[] = [];

    if (data.potCapacity) {
      promises.push(userDataPotCapacity.setData(userId, data.potCapacity));
    }
    if (data.type) {
      promises.push(userDataMealType.setData(userId, data.type));
    }
    if (type === 'cooking') {
      promises.push(userDataRecipeLevel.setData(userId, data.level));
      promises.push(userDataIngredientCount.setData(userId, data.ingredientCount));
    }

    await Promise.all(promises);
    return;
  }

  if (type === 'teamAnalysisSetup') {
    await userDataTeamAnalysisSetup.setData(userId, data);
    return;
  }

  if (type === 'pokedex') {
    await userDataPokedex.setData(userId, data);
    return;
  }

  if (type === 'potCapacity') {
    if (!data) {
      return;
    }

    await userDataPotCapacity.setData(userId, data);
    return;
  }

  if (type === 'pokebox') {
    await updateUserPokebox(userId, data);
    return;
  }

  console.error(`Unhandled user data upload type: [${type satisfies never}]`);
};

export const getUserData = async (userId: string): Promise<UserData> => {
  const [
    mealType,
    recipeLevel,
    teamAnalysis,
    pokedex,
    potCapacity,
    ingredientCount,
  ] = await Promise.all([
    userDataMealType.getData(userId),
    userDataRecipeLevel.getData(userId),
    userDataTeamAnalysisSetup.getData(userId),
    userDataPokedex.getData(userId),
    userDataPotCapacity.getData(userId),
    userDataIngredientCount.getData(userId),
  ]);

  return {
    mealType: mealType?.data,
    recipeLevel: recipeLevel?.data,
    teamAnalysisSetup: teamAnalysis?.data,
    pokedex: pokedex?.data,
    potCapacity: potCapacity?.data,
    ingredientCount: ingredientCount?.data,
  };
};

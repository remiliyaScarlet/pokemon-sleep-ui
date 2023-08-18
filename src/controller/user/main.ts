import {updateUserPokebox} from '@/controller/pokebox';
import {
  userDataIngredientCount,
  userDataMealType,
  userDataPokeboxDisplay,
  userDataPokedex,
  userDataPotCapacity,
  userDataRecipeLevel,
  userDataTeamAnalysisSetup,
} from '@/controller/user/manager';
import {UploadUserDataOpts} from '@/types/userData/upload';
import {UserPreloadedData} from '@/types/userData/userData';


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
    await Promise.all([
      userDataPokeboxDisplay.setData(userId, data.display),
      updateUserPokebox(userId, data.pokebox),
    ]);
    return;
  }

  console.error(`Unhandled user data upload type: [${type satisfies never}]`);
};

export const getUserPreloadedData = async (userId: string): Promise<UserPreloadedData> => {
  const [
    mealType,
    recipeLevel,
    teamAnalysis,
    pokedex,
    pokeboxDisplay,
    potCapacity,
    ingredientCount,
  ] = await Promise.all([
    userDataMealType.getData(userId),
    userDataRecipeLevel.getData(userId),
    // FIXME: Move this to lazy load
    userDataTeamAnalysisSetup.getData(userId),
    userDataPokedex.getData(userId),
    userDataPokeboxDisplay.getData(userId),
    userDataPotCapacity.getData(userId),
    userDataIngredientCount.getData(userId),
  ]);

  return {
    mealType: mealType?.data,
    recipeLevel: recipeLevel?.data,
    teamAnalysisSetup: teamAnalysis?.data,
    pokedex: pokedex?.data,
    pokeboxDisplay: pokeboxDisplay?.data,
    potCapacity: potCapacity?.data,
    ingredientCount: ingredientCount?.data,
  };
};

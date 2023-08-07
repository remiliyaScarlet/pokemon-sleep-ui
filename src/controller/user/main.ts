import {
  userDataPokedex,
  userDataPotCapacity,
  userDataRecipeLevel,
  userDataTeamAnalysisSetup,
} from '@/controller/user/manager';
import {UploadUserDataOpts, UserData} from '@/types/userData';


export const uploadUserData = async ({userId, opts}: {userId: string, opts: UploadUserDataOpts}) => {
  const {type, data} = opts;

  if (type === 'recipeLevel') {
    await userDataRecipeLevel.setData(userId, data.level);
    await userDataPotCapacity.setData(userId, data.potCapacity);
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

  console.error(`Unhandled user data upload type: [${type satisfies never}]`);
};

export const getUserData = async (userId: string): Promise<UserData> => {
  const [
    recipeLevel,
    teamAnalysis,
    pokedex,
    potCapacity,
  ] = await Promise.all([
    userDataRecipeLevel.getData(userId),
    userDataTeamAnalysisSetup.getData(userId),
    userDataPokedex.getData(userId),
    userDataPotCapacity.getData(userId),
  ]);

  return {
    recipeLevel: recipeLevel?.data,
    teamAnalysisSetup: teamAnalysis?.data,
    pokedex: pokedex?.data,
    potCapacity: potCapacity?.data,
  };
};

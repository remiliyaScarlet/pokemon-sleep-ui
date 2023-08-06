import {getUserRecipeLevel, setUserRecipeLevel} from '@/controller/user/recipeLevel';
import {UpdateUserDataOpts, UserData} from '@/types/userData';


export const updateUserData = async ({userId, opts}: {userId: string, opts: UpdateUserDataOpts}) => {
  const {type, data} = opts;

  if (type === 'recipeLevel') {
    await setUserRecipeLevel(userId, data);
    return;
  }
};

export const getUserData = async (userId: string): Promise<UserData> => {
  const [recipeLevel] = await Promise.all([
    getUserRecipeLevel(userId),
  ]);

  return {
    recipeLevel: recipeLevel?.recipeLevel,
  };
};

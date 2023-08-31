import {addSinglePokeInBox, deleteSinglePokeInBox, upsertSinglePokeInBox} from '@/controller/pokebox';
import {
  userDataIngredientCount,
  userDataMealType,
  userDataPokeboxDisplay,
  userDataPokedex,
  userDataPotCapacity,
  userDataRecipeLevel,
  userDataTeamAnalysisSetup,
} from '@/controller/user/manager';
import {UserDataUploadOpts} from '@/types/userData/upload';


type UploadUserDataOpts = {
  userId: string,
  opts: UserDataUploadOpts,
};

export const uploadUserData = async ({userId, opts}: UploadUserDataOpts) => {
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

  if (type === 'pokebox.display') {
    await userDataPokeboxDisplay.setData(userId, data);
    return;
  }

  if (type === 'pokebox.create') {
    await addSinglePokeInBox(userId, opts.data);
    return;
  }

  if (type === 'pokebox.upsert') {
    await upsertSinglePokeInBox(userId, opts.data);
    return;
  }

  if (type === 'pokebox.delete') {
    await deleteSinglePokeInBox(userId, opts.data);
    return;
  }

  console.error(`Unhandled user data upload type: [${type satisfies never}]`);
};

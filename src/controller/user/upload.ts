import {addSinglePokeInBox, deleteSinglePokeInBox, upsertSinglePokeInBox} from '@/controller/pokebox';
import {
  userDataCooking,
  userDataPokeboxDisplay,
  userDataPokedex,
  userDataSettings,
  userDataTeamAnalysisSetup,
} from '@/controller/user/manager';
import {UserDataUploadOpts} from '@/types/userData/upload';


type UploadUserDataOpts = {
  userId: string,
  opts: UserDataUploadOpts,
};

export const uploadUserData = async ({userId, opts}: UploadUserDataOpts) => {
  const {type, data} = opts;

  if (type === 'teamAnalysisSetup') {
    await userDataTeamAnalysisSetup.setData(userId, data);
    return;
  }

  if (type === 'pokedex') {
    await userDataPokedex.setData(userId, data);
    return;
  }

  if (type === 'pokebox.display') {
    await userDataPokeboxDisplay.setData(userId, data);
    return;
  }

  if (type === 'pokebox.create') {
    await addSinglePokeInBox(userId, data);
    return;
  }

  if (type === 'pokebox.upsert') {
    await upsertSinglePokeInBox(userId, data);
    return;
  }

  if (type === 'pokebox.delete') {
    await deleteSinglePokeInBox(userId, data);
    return;
  }

  if (type === 'cooking') {
    await userDataCooking.setData(userId, data);
    return;
  }

  if (type === 'settings') {
    await userDataSettings.setData(userId, data);
    return;
  }

  console.error(`Unhandled user data upload type: [${type satisfies never}]`);
};

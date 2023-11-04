import {addDoc, deleteDoc, updateDoc} from '@/controller/docs';
import {addSinglePokeInBox, deleteSinglePokeInBox, upsertSinglePokeInBox} from '@/controller/pokebox';
import {addSleepdexRecord, removeSleepdexRecord} from '@/controller/sleepdex';
import {removeActivationDataByKey, updateActivationDataByKey} from '@/controller/user/activation/data';
import {updateActivationKeyByKey} from '@/controller/user/activation/key';
import {
  userDataCooking,
  userDataPokeboxDisplay,
  userDataPokedex,
  userDataSettings,
} from '@/controller/user/manager';
import {updateTeamAnalysisComps} from '@/controller/user/teamAnalysis/comp';
import {updateTeamAnalysisConfig} from '@/controller/user/teamAnalysis/config';
import {UserDataUploadOpts} from '@/types/userData/upload';


type UploadUserDataOpts = {
  userId: string,
  opts: UserDataUploadOpts,
};

export const uploadUserData = async ({userId, opts}: UploadUserDataOpts) => {
  const {type, data} = opts;

  if (type === 'teamAnalysis') {
    const {config, comps} = data;

    await Promise.all([
      updateTeamAnalysisConfig({userId, config}),
      updateTeamAnalysisComps({userId, comps}),
    ]);
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

  if (type === 'sleepdex.mark') {
    await addSleepdexRecord(userId, data);
    return;
  }

  if (type === 'sleepdex.unmark') {
    await removeSleepdexRecord(userId, data);
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

  if (type === 'admin.activation.update.key') {
    await updateActivationKeyByKey({
      ...data,
      executorUserId: userId,
      expiry: new Date(data.expiry),
    });
    return;
  }

  if (type === 'admin.activation.update.data') {
    await updateActivationDataByKey({
      ...data,
      executorUserId: userId,
      expiry: new Date(data.expiry),
    });
    return;
  }

  if (type === 'admin.activation.delete') {
    await removeActivationDataByKey({executorUserId: userId, key: data});
    return;
  }

  if (type === 'cms.docs.create') {
    await addDoc({executorUserId: userId, doc: data});
    return;
  }

  if (type === 'cms.docs.edit') {
    await updateDoc({executorUserId: userId, doc: data});
    return;
  }

  if (type === 'cms.docs.delete') {
    await deleteDoc({executorUserId: userId, ...data});
    return;
  }

  console.error(`Unhandled user data upload type: [${type satisfies never}]`);
};

import {getUserPokebox, getUserPokeboxSorted} from '@/controller/pokebox';
import {userDataTeamAnalysisSetup} from '@/controller/user/manager';
import {UserDataLoadingOpts} from '@/types/userData/load';
import {UserLazyLoadedData} from '@/types/userData/main';


export const emptyLazyData: UserLazyLoadedData = {
  teamAnalysisSetup: undefined,
  pokebox: undefined,
};

type GetUserLazyDataOpts = {
  initialData: UserLazyLoadedData,
  userId: string,
  options: UserDataLoadingOpts,
};

const loadData = async ({userId, options}: GetUserLazyDataOpts) => {
  const {type, opts} = options;

  if (type === 'teamAnalysisSetup') {
    return (await userDataTeamAnalysisSetup.getData(userId))?.data satisfies UserLazyLoadedData['teamAnalysisSetup'];
  }

  if (type === 'pokebox') {
    return await getUserPokebox(userId) satisfies UserLazyLoadedData['pokebox'];
  }

  if (type === 'pokeboxSorted') {
    return await getUserPokeboxSorted(userId) satisfies UserLazyLoadedData['pokeboxSorted'];
  }

  console.error(`Unknown data type ${dataType satisfies never} to load data`);
  return undefined;
};

export const getUserLazyData = async (opts: GetUserLazyDataOpts): Promise<UserLazyLoadedData> => {
  const {initialData, options} = opts;

  return {
    ...initialData,
    ...emptyLazyData,
    [options.type]: await loadData(opts),
  };
};

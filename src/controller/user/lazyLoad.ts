import {getUserPokebox, getUserPokeboxSorted} from '@/controller/pokebox';
import {userDataTeamAnalysisSetup} from '@/controller/user/manager';
import {UserLazyLoadedDataType} from '@/types/userData/lazyLoaded';
import {UserLazyLoadedData} from '@/types/userData/main';


export const emptyLazyData: UserLazyLoadedData = {
  teamAnalysisSetup: undefined,
  pokebox: undefined,
};

type GetUserLazyDataOpts = {
  initialData: UserLazyLoadedData,
  userId: string,
  dataType: UserLazyLoadedDataType,
};

const loadData = async ({dataType, userId}: GetUserLazyDataOpts) => {
  if (dataType === 'teamAnalysisSetup') {
    return (await userDataTeamAnalysisSetup.getData(userId))?.data satisfies UserLazyLoadedData['teamAnalysisSetup'];
  }

  if (dataType === 'pokebox') {
    return await getUserPokebox(userId) satisfies UserLazyLoadedData['pokebox'];
  }

  if (dataType === 'pokeboxSorted') {
    return await getUserPokeboxSorted(userId) satisfies UserLazyLoadedData['pokeboxSorted'];
  }

  console.error(`Unknown data type ${dataType satisfies never} to load data`);
  return undefined;
};

export const getUserLazyData = async (opts: GetUserLazyDataOpts): Promise<UserLazyLoadedData> => {
  const {initialData, dataType} = opts;

  return {
    ...initialData,
    ...emptyLazyData,
    [dataType]: await loadData(opts),
  };
};

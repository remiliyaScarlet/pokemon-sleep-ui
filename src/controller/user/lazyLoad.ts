import {getSinglePokeInBox, getUserPokebox, getUserPokeboxSorted} from '@/controller/pokebox';
import {getSleepdexMap, getSleepdexMapOfPokemon} from '@/controller/sleepdex';
import {generateActivationKey} from '@/controller/user/activation/key';
import {getTeamAnalysisCompsOfUser, getTeamMemberById} from '@/controller/user/teamAnalysis/comp';
import {getTeamAnalysisConfigOfUser} from '@/controller/user/teamAnalysis/config';
import {UserDataLoadingOpts} from '@/types/userData/load';
import {UserLazyLoadedData} from '@/types/userData/main';
import {toUserActivationProperties} from '@/utils/user/activation/utils';
import {extractTeamMemberId} from '@/utils/user/teamAnalysis';


export const emptyLazyData: UserLazyLoadedData = {
  teamAnalysis: undefined,
  pokebox: undefined,
};

type GetUserLazyDataOpts = {
  initialData: UserLazyLoadedData,
  userId: string,
  options: UserDataLoadingOpts,
};

const loadData = async ({userId, options}: GetUserLazyDataOpts) => {
  const {type, opts} = options;

  if (type === 'teamAnalysis') {
    const [config, comps] = await Promise.all([
      getTeamAnalysisConfigOfUser(userId),
      getTeamAnalysisCompsOfUser(userId),
    ]);

    if (!config) {
      return undefined;
    }

    return {config, comps} satisfies UserLazyLoadedData['teamAnalysis'];
  }

  if (type === 'teamAnalysisMember') {
    const teamMemberId = extractTeamMemberId(opts.teamMemberId);
    if (!teamMemberId) {
      return undefined;
    }

    const member = await getTeamMemberById(teamMemberId);
    if (!member) {
      return undefined;
    }

    return member satisfies UserLazyLoadedData['teamAnalysisMember'];
  }

  if (type === 'pokebox') {
    return await getUserPokebox(userId) satisfies UserLazyLoadedData['pokebox'];
  }

  if (type === 'pokeboxSingle') {
    return (await getSinglePokeInBox(opts.pokeInBoxUuid) ?? undefined) satisfies UserLazyLoadedData['pokeboxSingle'];
  }

  if (type === 'pokeboxSorted') {
    return await getUserPokeboxSorted(userId) satisfies UserLazyLoadedData['pokeboxSorted'];
  }

  if (type === 'sleepdex') {
    return await getSleepdexMap(userId) satisfies UserLazyLoadedData['sleepdex'];
  }

  if (type === 'sleepdexOfPokemon') {
    return await getSleepdexMapOfPokemon(userId, opts.pokemonId) satisfies UserLazyLoadedData['sleepdexOfPokemon'];
  }

  if (type === 'adminActivationCreate') {
    return await generateActivationKey({
      executorUserId: userId,
      ...toUserActivationProperties(opts),
    }) satisfies UserLazyLoadedData['adminActivationCreate'];
  }

  console.error(`Unknown data type ${type satisfies never} to load data`);
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

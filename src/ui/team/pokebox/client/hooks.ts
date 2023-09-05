import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {useEffectiveBonus} from '@/hooks/userData/settings';
import {Pokebox} from '@/types/game/pokebox';
import {useFilteredSortedPokebox} from '@/ui/team/pokebox/content/hook';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {isNotNullish} from '@/utils/type';


type UseCalculatedDataOpts = PokeboxCommonProps & {
  pokebox: Pokebox,
  session: ReturnType<typeof useSession>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

export const useCalculatedData = (opts: UseCalculatedDataOpts) => {
  const {
    pokedexMap,
    preloaded,
    session,
    setLoading,
  } = opts;

  const t = useTranslations('Game');

  const bonus = useEffectiveBonus({
    server: preloaded.settings,
    client: session.data?.user.preloaded.settings,
  });
  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxViewerFilter({
    pokemonNameMap: Object.fromEntries(
      Object.values(pokedexMap)
        .filter(isNotNullish)
        .map(({id}) => [id, t(`PokemonName.${id}`)]),
    ),
    ...opts,
  });
  const filteredSortedPokebox = useFilteredSortedPokebox({
    ...opts,
    filter,
    bonus,
    isIncluded,
    setLoading,
  });

  useAutoUpload({
    opts: {
      type: 'pokebox.display',
      data: {sort: filter.sort, displayType: filter.displayType, viewType: filter.viewType},
    },
    triggerDeps: [filter.sort, filter.displayType, filter.viewType],
    delay: 0,
  });

  return {
    bonus,
    filter,
    setFilter,
    filteredSortedPokebox,
  };
};

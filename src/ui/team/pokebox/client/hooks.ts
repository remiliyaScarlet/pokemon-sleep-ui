import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {useUserSettings} from '@/hooks/userData/settings';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {useFilteredSortedPokebox} from '@/ui/team/pokebox/content/hook';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {isNotNullish} from '@/utils/type';


type UseCalculatedDataOpts = PokeboxCommonProps & {
  pokebox: Pokebox,
  session: ReturnType<typeof useSession>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

export const useCalculatedData = (
  opts: UseCalculatedDataOpts,
) => {
  const {
    pokedexMap,
    preloaded,
    pokebox,
    session,
    setLoading,
  } = opts;

  const t = useTranslations('Game');

  const {bonus} = useUserSettings({
    server: preloaded.settings,
    client: session.data?.user.preloaded.settings,
  });
  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxViewerFilter({
    ...opts,
    pokemonNameMap: Object.fromEntries(
      Object.values(pokedexMap)
        .filter(isNotNullish)
        .map(({id}) => [id, t(`PokemonName.${id}`)]),
    ),
  });

  const filteredSortedPokebox = useFilteredSortedPokebox({
    ...opts,
    pokeboxForCalc: Object.fromEntries(Object.values(pokebox).filter(isNotNullish).map((pokeInBox) => [
      pokeInBox.uuid,
      {
        ...pokeInBox,
        level: filter.previewLevel ?? pokeInBox.level,
      } satisfies PokeInBox,
    ])),
    filter,
    bonus,
    isIncluded,
    setLoading,
  });

  useAutoUpload({
    opts: {
      type: 'pokebox.display',
      data: {
        // Explicit references here so no extra data get stored
        sort: filter.sort,
        displayOfGrid: filter.displayOfGrid,
        displayOfTable: filter.displayOfTable,
        viewType: filter.viewType,
        previewLevel: filter.previewLevel,
        version: filter.version,
      },
    },
    triggerDeps: [filter.sort, filter.displayOfGrid, filter.displayOfTable, filter.viewType, filter.previewLevel],
    delay: 0,
  });

  return {
    bonus,
    filter,
    setFilter,
    filteredSortedPokebox,
  };
};

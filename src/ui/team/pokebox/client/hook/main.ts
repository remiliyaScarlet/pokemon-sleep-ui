import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {useUserSettings} from '@/hooks/userData/settings/main';
import {Pokebox} from '@/types/game/pokebox';
import {useProcessedPokebox} from '@/ui/team/pokebox/client/hook/process';
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

  const settings = useUserSettings({
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

  const processedPokebox = useProcessedPokebox({
    ...opts,
    pokeInBoxToCalc: Object.values(pokebox).filter(isNotNullish).map((pokeInBox) =>({
      ...pokeInBox,
      level: filter.previewLevel ?? pokeInBox.level,
    })),
    filter,
    settings,
    isIncluded,
    setLoading,
  });

  useAutoUpload({
    opts: {
      type: 'pokebox.display',
      data: {
        // Explicit references here so no extra data get stored
        sort: filter.sort,
        ratingBasis: filter.ratingBasis,
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
    settings,
    filter,
    setFilter,
    processedPokebox,
  };
};

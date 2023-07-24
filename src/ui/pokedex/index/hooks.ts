import React from 'react';

import {useTranslations} from 'next-intl';

import {PokedexData, PokedexFilter, PokedexInclusionMap} from '@/ui/pokedex/index/type';


type GetFilteredPokedexOpts = {
  data: PokedexData,
};

export const useFilteredPokedex = ({data}: GetFilteredPokedexOpts) => {
  const t = useTranslations('Game.PokemonName');
  const [filter, setFilter] = React.useState<PokedexFilter>({
    name: '',
    type: null,
    sleepType: null,
    skill: null,
    mapId: null,
  });
  const isIncluded = React.useMemo((): PokedexInclusionMap => (
    Object.fromEntries(data.map(({id, type, sleepType, skill, sleepStyles}) => {
      if (filter.name !== '' && t(id.toString()) === filter.name) {
        return [id, true];
      }

      if (filter.type !== null && type === filter.type) {
        return [id, true];
      }

      if (filter.sleepType !== null && sleepType === filter.sleepType) {
        return [id, true];
      }

      if (filter.skill !== null && skill === filter.skill) {
        return [id, true];
      }

      if (filter.mapId !== null && sleepStyles.some(({mapId}) => mapId === filter.mapId)) {
        return [id, true];
      }

      return [id, false];
    }))
  ), [filter]);

  return {filter, setFilter, isIncluded};
};

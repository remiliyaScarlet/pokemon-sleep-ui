import React from 'react';

import {useTranslations} from 'next-intl';

import {PokedexData, PokedexFilter} from '@/ui/pokedex/index/type';


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
  const filteredData = React.useMemo(() => (
    data
      .filter(({id}) => filter.name !== '' ? t(id.toString()) === filter.name : true)
      .filter(({type}) => filter.type !== null ? type === filter.type : true)
      .filter(({sleepType}) => filter.sleepType !== null ? sleepType === filter.sleepType : true)
      .filter(({skill}) => filter.skill !== null ? skill === filter.skill : true)
      .filter(({sleepStyles}) => filter.mapId !== null ? sleepStyles.some(({mapId}) => mapId === filter.mapId) : true)
  ), [filter]);

  return {filter, setFilter, filteredData};
};

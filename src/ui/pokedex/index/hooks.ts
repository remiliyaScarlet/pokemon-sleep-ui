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
    ingredient: null,
    berryId: null,
    display: 'mainSkill',
  });
  const isIncluded = React.useMemo((): PokedexInclusionMap => (
    Object.fromEntries(data.map(({
      id,
      type,
      sleepType,
      skill,
      sleepStyles,
      ingredients,
      berry,
    }) => {
      if (filter.name !== '' && t(id.toString()) !== filter.name) {
        return [id, false];
      }

      if (filter.type !== null && type !== filter.type) {
        return [id, false];
      }

      if (filter.sleepType !== null && sleepType !== filter.sleepType) {
        return [id, false];
      }

      if (filter.skill !== null && skill !== filter.skill) {
        return [id, false];
      }

      if (filter.mapId !== null && !sleepStyles.some(({mapId}) => mapId === filter.mapId)) {
        return [id, false];
      }

      if (filter.ingredient !== null && !ingredients.some((id) => id === filter.ingredient)) {
        return [id, false];
      }

      if (filter.berryId !== null && berry.id !== filter.berryId) {
        return [id, false];
      }

      return [id, true];
    }))
  ), [filter]);

  return {filter, setFilter, isIncluded};
};

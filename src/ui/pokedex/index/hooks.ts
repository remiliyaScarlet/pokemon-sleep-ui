import {useTranslations} from 'next-intl';

import {useFilterInput} from '@/components/input/filter/hooks';
import {PokemonId} from '@/types/mongo/pokemon';
import {PokedexData, PokedexFilter, PokedexSinglePokemon} from '@/ui/pokedex/index/type';


type UseFilteredPokedexOpts = {
  data: PokedexData,
};

export const useFilteredPokedex = ({data}: UseFilteredPokedexOpts) => {
  const t = useTranslations('Game.PokemonName');

  return useFilterInput<PokedexFilter, PokedexSinglePokemon, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      name: '',
      type: null,
      sleepType: null,
      skill: null,
      mapId: null,
      ingredient: null,
      berryId: null,
      display: 'mainSkill',
    },
    isDataIncluded: (filter, data) => {
      if (filter.name !== '' && t(data.id.toString()) !== filter.name) {
        return false;
      }

      if (filter.type !== null && data.type !== filter.type) {
        return false;
      }

      if (filter.sleepType !== null && data.sleepType !== filter.sleepType) {
        return false;
      }

      if (filter.skill !== null && data.skill !== filter.skill) {
        return false;
      }

      if (filter.mapId !== null && !data.sleepStyles.some(({mapId}) => mapId === filter.mapId)) {
        return false;
      }

      if (filter.ingredient !== null && !data.ingredients.some((id) => id === filter.ingredient)) {
        return false;
      }

      return !(filter.berryId !== null && data.berry.id !== filter.berryId);
    },
  });
};

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
      ingredientFixed: null,
      ingredientRandom: null,
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

      if (filter.ingredientFixed !== null && data.ingredients.fixed !== filter.ingredientFixed) {
        return false;
      }

      if (filter.ingredientRandom !== null && !data.ingredients.random?.some((id) => id === filter.ingredientRandom)) {
        return false;
      }

      return !(filter.berryId !== null && data.berry.id !== filter.berryId);
    },
  });
};

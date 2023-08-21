import merge from 'lodash/merge';
import {Session} from 'next-auth';

import {generatePokemonInputFilter} from '@/components/shared/pokemon/input/utils';
import {PokedexFilter} from '@/ui/pokedex/index/type';


export const generateInitialFilter = (session: Session | null): PokedexFilter => {
  return {
    name: '',
    mapId: {},
    ...generatePokemonInputFilter(),
    level: 1,
    snorlaxFavorite: {},
    ...merge({
      display: 'mainSkill',
      sort: 'id',
    }, session?.user.preloaded.pokedex),
  };
};

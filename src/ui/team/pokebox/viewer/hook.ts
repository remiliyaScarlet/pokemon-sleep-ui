import merge from 'lodash/merge';
import {Session} from 'next-auth';

import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterMatchingSearch} from '@/components/input/filter/utils/check';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {Pokebox} from '@/types/game/pokebox';
import {PokedexMap, PokemonId} from '@/types/game/pokemon';
import {PokeboxPokemonForView, PokeboxViewerDisplay, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {isNotNullish} from '@/utils/type';


type UsePokeboxViewerFilterOpts = UsePokemonFilterCommonData & {
  session: Session | null,
  pokebox: Pokebox,
  pokedexMap: PokedexMap,
  pokemonNameMap: {[id in PokemonId]?: string},
};

export const usePokeboxViewerFilter = ({
  session,
  pokebox,
  pokedexMap,
  pokemonNameMap,
  ...filterData
}: UsePokeboxViewerFilterOpts) => {
  return useFilterInput<PokeboxViewerFilter, PokeboxPokemonForView, string>({
    data: Object.values(pokebox)
      .filter(isNotNullish)
      .map((inBox) => {
        const pokemonId = inBox.pokemon;
        if (!pokemonId) {
          return null;
        }

        const pokemon = pokedexMap[pokemonId];
        if (!pokemon) {
          return null;
        }

        return {
          info: pokemon,
          inBox,
          names: [inBox.name, pokemonNameMap[pokemonId]].filter(isNotNullish),
        } satisfies PokeboxPokemonForView;
      })
      .filter(isNotNullish),
    dataToId: ({inBox}) => inBox.uuid,
    initialFilter: {
      ...generatePokemonInputFilter(),
      name: '',
      snorlaxFavorite: {},
      ...merge({
        sort: 'id',
        displayType: 'productionTotal',
        viewType: 'table',
      } satisfies PokeboxViewerDisplay, session?.user.preloaded?.pokeboxDisplay),
    },
    isDataIncluded: (filter, data) => {
      if (!isFilterMatchingSearch({filter, filterKey: 'name', search: data.names})) {
        return false;
      }

      return isPokemonIncludedFromFilter({filter, pokemon: data.info, ...filterData});
    },
  });
};

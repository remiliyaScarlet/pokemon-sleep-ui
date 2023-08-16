import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterMatchingSearch} from '@/components/input/filter/utils/check';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {Pokebox} from '@/types/game/pokebox';
import {PokedexMap, PokemonId} from '@/types/mongo/pokemon';
import {PokeboxPokemonForView, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {isNotNullish} from '@/utils/type';


type UsePokeboxViewerFilterOpts = {
  pokebox: Pokebox,
  pokedexMap: PokedexMap,
  pokemonNameMap: {[id in PokemonId]?: string},
};

export const usePokeboxViewerFilter = ({pokebox, pokedexMap, pokemonNameMap}: UsePokeboxViewerFilterOpts) => {
  return useFilterInput<PokeboxViewerFilter, PokeboxPokemonForView, PokemonId>({
    data: pokebox
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
    dataToId: ({info}) => info.id,
    initialFilter: {
      ...generatePokemonInputFilter(),
      name: '',
      displayType: 'production',
    },
    isDataIncluded: (filter, data) => {
      const filterName = filter.name.toUpperCase();
      if (filter.name !== '' && !data.names.some((name) => name.toUpperCase().includes(filterName))) {
        return false;
      }

      if (!isFilterMatchingSearch({filter, filterKey: 'name', search: data.names})) {
        return false;
      }

      return isPokemonIncludedFromFilter(filter, data.info);
    },
  });
};

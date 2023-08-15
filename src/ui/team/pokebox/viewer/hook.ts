import {useFilterInput} from '@/components/input/filter/hook';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {Pokebox} from '@/types/game/pokebox';
import {PokedexMap, PokemonId} from '@/types/mongo/pokemon';
import {PokeboxPokemonForView, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {isNotNullish} from '@/utils/type';


type UsePokeboxViewerFilterOpts = {
  pokebox: Pokebox,
  pokedexMap: PokedexMap,
};

export const usePokeboxViewerFilter = ({pokebox, pokedexMap}: UsePokeboxViewerFilterOpts) => {
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
        } satisfies PokeboxPokemonForView;
      })
      .filter(isNotNullish),
    dataToId: ({info}) => info.id,
    initialFilter: {
      ...generatePokemonInputFilter(),
      displayType: 'production',
    },
    isDataIncluded: (filter, data) => {
      return isPokemonIncludedFromFilter(filter, data.info);
    },
  });
};

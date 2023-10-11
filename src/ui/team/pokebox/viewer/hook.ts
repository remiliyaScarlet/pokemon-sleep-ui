import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterMatchingSearch, isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {
  pokemonIngredientInputToLevel,
  pokemonInputTypeOfIngredients,
  UsePokemonFilterCommonData,
} from '@/components/shared/pokemon/input/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {enforceFilterWithSkillValue} from '@/components/shared/pokemon/sorter/enforcer/skillValue';
import {defaultPokemonSort} from '@/const/filter';
import {Pokebox} from '@/types/game/pokebox';
import {PokemonId} from '@/types/game/pokemon';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxPokemonForView, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {migrate} from '@/utils/migrate/main';
import {pokeboxDisplayMigrators} from '@/utils/migrate/pokeboxDisplay/migrators';
import {isNotNullish} from '@/utils/type';


type UsePokeboxViewerFilterOpts = UsePokemonFilterCommonData & PokeboxCommonProps & {
  pokebox: Pokebox,
  pokemonNameMap: {[id in PokemonId]?: string},
};

export const usePokeboxViewerFilter = ({
  pokebox,
  pokedexMap,
  pokemonNameMap,
  preloaded,
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
      ...migrate({
        original: {
          sort: 'id',
          displayOfGrid: 'productionTotal',
          displayOfTable: {},
          viewType: 'table',
          previewLevel: null,
          version: 3,
        },
        override: preloaded.display ?? {},
        migrators: pokeboxDisplayMigrators,
        migrateParams: {},
      }),
    },
    isDataIncluded: (filter, data) => {
      if (!isFilterMatchingSearch({filter, filterKey: 'name', search: data.names})) {
        return false;
      }

      if (pokemonInputTypeOfIngredients.some((inputType) => isFilterMismatchOnSingle({
        filter,
        filterKey: inputType,
        id: data.inBox.ingredients[pokemonIngredientInputToLevel[inputType]].id,
      }))) {
        return false;
      }

      return isPokemonIncludedFromFilter({filter, pokemon: data.info, ...filterData});
    },
    deps: [pokebox],
    onSetFilter: (original, updated) => enforceFilterWithSkillValue<
      PokeboxViewerFilter,
      PokeboxViewerFilter['sort']
    >({
      original,
      updated,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {[Object.values(pokedexMap).filter(isNotNullish)[0].skill]: true}},
        sort: [
          {key: 'sort', defaultValue: defaultPokemonSort},
        ],
      },
    }),
  });
};

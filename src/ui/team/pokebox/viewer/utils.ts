import {
  isFilterIncludingSome,
  isFilterMatchingSearch,
  isFilterMismatchOnSingle,
} from '@/components/input/filter/utils/check';
import {
  pokemonIngredientInputToLevel,
  pokemonInputTypeOfIngredients,
  UsePokemonFilterCommonData,
} from '@/components/shared/pokemon/input/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {natureDataMap} from '@/data/nature';
import {PokeboxDataProps} from '@/ui/team/pokebox/type';
import {PokeboxPokemonForView, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {migrate} from '@/utils/migrate/main';
import {pokeboxDisplayMigrators} from '@/utils/migrate/pokeboxDisplay/migrators';


export const generatePokeboxViewerFilter = (preloaded: PokeboxDataProps['preloaded']): PokeboxViewerFilter => ({
  ...generatePokemonInputFilter(),
  name: '',
  snorlaxFavorite: {},
  subSkill: {},
  natureBuff: {},
  natureNerf: {},
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
});

export const isPokeInBoxIncluded = (
  filterData: UsePokemonFilterCommonData,
) => (
  filter: PokeboxViewerFilter,
  data: PokeboxPokemonForView,
) => {
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

  if (!isFilterIncludingSome({
    filter,
    filterKey: 'subSkill',
    ids: Object.values(data.inBox.subSkill),
  })) {
    return false;
  }

  if (isFilterMismatchOnSingle({
    filter,
    filterKey: 'natureBuff',
    id: data.inBox.nature ? natureDataMap[data.inBox.nature]?.buff : null,
  })) {
    return false;
  }

  if (isFilterMismatchOnSingle({
    filter,
    filterKey: 'natureNerf',
    id: data.inBox.nature ? natureDataMap[data.inBox.nature]?.nerf : null,
  })) {
    return false;
  }

  return isPokemonIncludedFromFilter({filter, pokemon: data.info, ...filterData});
};

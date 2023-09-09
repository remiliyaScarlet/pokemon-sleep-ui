import {generatePokemonInputFilterExtended} from '@/components/shared/pokemon/input/utils';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {PokedexDisplayType} from '@/ui/pokedex/index/input/type';
import {PokedexDisplay, PokedexFilter} from '@/ui/pokedex/index/type';
import {migrate} from '@/utils/migrate/main';
import {pokedexMigrators} from '@/utils/migrate/pokedex/migrators';


const exhaustIngredientCombinationsIfDisplay: PokedexDisplayType[] = [
  'ingredient',
  'ingredientCount',
  'ingredientEnergy',
  'frequencyOfIngredient',
  'totalEnergy',
];

const exhaustIngredientCombinationsIfSort: PokemonSortType[] = [
  'ingredientCount',
  'ingredientEnergy',
  'frequencyOfIngredient',
  'totalEnergy',
];

export const toCalculateAllIngredientPossibilities = ({display, sort}: PokedexFilter): boolean => {
  return (
    exhaustIngredientCombinationsIfDisplay.includes(display) ||
    exhaustIngredientCombinationsIfSort.includes(sort)
  );
};

export const generateInitialFilter = (preloadedDisplay: Partial<PokedexDisplay> | undefined): PokedexFilter => {
  return migrate({
    original: {
      name: '',
      sort: 'id',
      display: 'mainSkill',
      ...generatePokemonInputFilterExtended(),
      version: 1,
    },
    override: preloadedDisplay ?? null,
    migrators: pokedexMigrators,
    migrateParams: {},
  })

  ;
};

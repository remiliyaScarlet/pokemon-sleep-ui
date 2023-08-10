import merge from 'lodash/merge';
import {Session} from 'next-auth';

import {BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {PokedexSortType} from '@/ui/pokedex/index/input/type';
import {PokedexFilter, PokemonSorterGetter, SortedPokemonInfo} from '@/ui/pokedex/index/type';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';


const pokemonSorterGetterBySortType: {[type in PokedexSortType]: PokemonSorterGetter} = {
  id: ({pokemon}) => pokemon.id,
  ingredientEnergy: ({level, pokemon, ingredientMap}) => getIngredientProducingRate({
    level,
    pokemon,
    ...defaultNeutralOpts,
    ingredientMap,
  })?.dailyEnergy ?? 0,
  ingredientCount: ({level, pokemon, ingredientMap}) => getIngredientProducingRate({
    level,
    pokemon,
    ...defaultNeutralOpts,
    ingredientMap,
  })?.quantity ?? 0,
  berryEnergy: ({level, pokemon, berryData}) => berryData ? getBerryProducingRate({
    level,
    pokemon,
    ...defaultNeutralOpts,
    isSnorlaxFavorite: false,
    berryData,
  }).dailyEnergy : 0,
  berryCount: ({level, pokemon, berryData}) => berryData ? getBerryProducingRate({
    level,
    pokemon,
    ...defaultNeutralOpts,
    isSnorlaxFavorite: false,
    berryData,
  }).quantity : 0,
  friendshipPoint: ({pokemon}) => pokemon.stats.friendshipPoints,
  totalEnergy: ({level, pokemon, berryData, ingredientMap}) => {
    if (!berryData) {
      return 0;
    }

    const berry = getBerryProducingRate({
      level,
      pokemon,
      ...defaultNeutralOpts,
      isSnorlaxFavorite: false,
      berryData,
    }).dailyEnergy;
    const ingredient = getIngredientProducingRate({
      level,
      pokemon,
      ...defaultNeutralOpts,
      ingredientMap,
    })?.dailyEnergy;

    return berry + (ingredient ?? 0);
  },
};

type GetPokemonSorterOpts = {
  type: PokedexSortType,
  level: number,
  pokemon: PokemonInfo,
  ingredientMap: IngredientMap,
  berryMap: BerryDataMap
};

export const getPokemonSorter = ({
  type,
  level,
  pokemon,
  ingredientMap,
  berryMap,
}: GetPokemonSorterOpts): number => {
  return pokemonSorterGetterBySortType[type]({
    pokemon,
    level,
    ingredientMap,
    berryData: berryMap[pokemon.berry.id],
  });
};

export const sortPokemon = (
  type: PokedexSortType,
) => (
  a: SortedPokemonInfo, b: SortedPokemonInfo,
) => {
  let comparer = a.sorter - b.sorter;

  if (comparer !== 0 && type !== 'id' && type !== 'friendshipPoint') {
    comparer *= -1;
  }

  if (comparer !== 0) {
    return comparer;
  }

  return a.pokemon.id - b.pokemon.id;
};

export const generateInitialFilter = (session: Session | null): PokedexFilter => {
  return {
    name: '',
    pokemonType: {},
    mapId: {},
    sleepType: {},
    specialty: {},
    ingredientFixed: {},
    ingredientRandom: {},
    berry: {},
    mainSkill: {},
    level: 1,
    ...merge({
      display: 'mainSkill',
      sort: 'id',
    }, session?.user.data.pokedex?.display),
  };
};

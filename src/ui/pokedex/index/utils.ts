import {BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {PokedexSortType} from '@/ui/pokedex/index/input/type';
import {PokemonComparerGetter} from '@/ui/pokedex/index/type';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';


const pokemonComparerGetterBySortType: {[type in PokedexSortType]: PokemonComparerGetter} = {
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
};

type SortPokemonOpts = {
  type: PokedexSortType,
  level: number,
  ingredientMap: IngredientMap,
  berryMap: BerryDataMap
};

export const sortPokemon = ({
  type,
  level,
  ingredientMap,
  berryMap,
}: SortPokemonOpts) => (
  a: PokemonInfo,
  b: PokemonInfo,
): number => {
  const comparerGetter = pokemonComparerGetterBySortType[type];

  const comparerA = comparerGetter({
    pokemon: a,
    level,
    ingredientMap,
    berryData: berryMap[a.berry.id],
  });
  const comparerB = comparerGetter({
    pokemon: b,
    level,
    ingredientMap,
    berryData: berryMap[b.berry.id],
  });
  let comparer = comparerA - comparerB;

  if (comparer !== 0 && type !== 'id' && type !== 'friendshipPoint') {
    comparer *= -1;
  }

  if (comparer !== 0) {
    return comparer;
  }

  return a.id - b.id;
};

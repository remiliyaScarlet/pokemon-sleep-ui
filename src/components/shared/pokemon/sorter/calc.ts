import {
  PokemonInfoWithSortingPayload,
  PokemonSorterGetter,
  PokemonSorterGetterOpts,
  PokemonSortType,
  SortedPokemonInfo,
} from '@/components/shared/pokemon/sorter/type';
import {BerryDataMap} from '@/types/mongo/berry';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
import {GetProducingRateChangeableOpts} from '@/utils/game/producing/type';


const sortInAsc: PokemonSortType[] = [
  'id',
  'frequency',
  'friendshipPoint',
];

const pokemonSorterGetterBySortType: {[type in PokemonSortType]: PokemonSorterGetter} = {
  id: ({pokemon}) => pokemon.id,
  ingredientEnergy: (opts) => getIngredientProducingRate(opts)?.dailyEnergy ?? 0,
  ingredientCount: ({berryData, ...opts}) => getIngredientProducingRate(opts)?.quantity ?? 0,
  berryEnergy: ({berryData, ...opts}) => berryData ? getBerryProducingRate({
    isSnorlaxFavorite: false,
    berryData,
    ...opts,
  }).dailyEnergy : 0,
  berryCount: ({berryData, ...opts}) => berryData ? getBerryProducingRate({
    isSnorlaxFavorite: false,
    berryData,
    ...opts,
  }).quantity : 0,
  friendshipPoint: ({pokemon}) => pokemon.stats.friendshipPoints,
  frequency: ({pokemon}) => pokemon.stats.frequency,
  totalEnergy: ({berryData, ...opts}) => {
    if (!berryData) {
      return 0;
    }

    const berry = getBerryProducingRate({
      isSnorlaxFavorite: false,
      berryData,
      ...opts,
    }).dailyEnergy;
    const ingredient = getIngredientProducingRate(opts)?.dailyEnergy;

    return berry + (ingredient ?? 0);
  },
};

export type GetPokemonSorterOpts = Pick<
  PokemonSorterGetterOpts,
  'pokemon' | 'level' | 'ingredientMap' | keyof GetProducingRateChangeableOpts
> & {
  type: PokemonSortType,
  berryMap: BerryDataMap
};

export const getPokemonSorter = ({
  type,
  pokemon,
  berryMap,
  ...opts
}: GetPokemonSorterOpts): number => {
  return pokemonSorterGetterBySortType[type]({
    pokemon,
    berryData: berryMap[pokemon.berry.id],
    ...opts,
  });
};

export const sortPokemon = <TExtra, TSource extends PokemonInfoWithSortingPayload<TExtra>>(
  type: PokemonSortType,
) => (
  a: SortedPokemonInfo<TExtra, TSource>, b: SortedPokemonInfo<TExtra, TSource>,
) => {
  let comparer = a.sorter - b.sorter;

  if (comparer !== 0 && !sortInAsc.some((basis) => type === basis)) {
    comparer *= -1;
  }

  if (comparer !== 0) {
    return comparer;
  }

  return a.source.pokemon.id - b.source.pokemon.id;
};

import {
  getBerryRateSorter,
  getIngredientFirstRateSorter,
  getIngredientTotalRateSorter,
  getPokemonRateSorter,
} from '@/components/shared/pokemon/sorter/calc/sorter';
import {PokemonSorterGetter, PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {getSkillTriggerValue} from '@/utils/game/mainSkill/utils';
import {getFrequencyOfStateFromPokemonRate} from '@/utils/game/producing/frequency';


export const sortInAsc: PokemonSortType[] = [
  'id',
  'frequencyBase',
  'frequency',
  'frequencyOfBerry',
  'frequencyOfIngredient',
  'friendshipPoint',
];

export const pokemonSorterGetterBySortType: {[type in PokemonSortType]: PokemonSorterGetter} = {
  id: ({pokemon}) => pokemon.id,
  level: ({level}) => level,
  dateAdded: ({dateAdded}) => dateAdded ?? 0,
  ingredientEnergy: (opts) => getIngredientTotalRateSorter({key: 'energy', opts}),
  ingredientCount: (opts) => getIngredientTotalRateSorter({key: 'quantity', opts}),
  ingredientRate: ({pokemonProducingParams}) => pokemonProducingParams.ingredientSplit,
  berryEnergy: (opts) => getBerryRateSorter({key: 'energy', opts}),
  berryCount: (opts) => getBerryRateSorter({key: 'quantity', opts}),
  friendshipPoint: ({pokemon}) => pokemon.stats.friendshipPoints,
  frequencyBase: ({pokemon}) => pokemon.stats.frequency,
  frequency: (opts) => getFrequencyOfStateFromPokemonRate({
    state: 'equivalent',
    rate: getPokemonRateSorter(opts),
  }),
  frequencyOfBerry: (opts) => getBerryRateSorter({key: 'frequency', opts}),
  frequencyOfIngredient: (opts) => getIngredientFirstRateSorter({key: 'frequency', opts}),
  timeToFullPack: (opts) => getPokemonRateSorter(opts).fullPackStats.secondsToFull,
  totalEnergy: (opts) => {
    const berry = getBerryRateSorter({key: 'energy', opts});
    const ingredient = getIngredientTotalRateSorter({key: 'energy', opts});

    return berry + ingredient;
  },
  mainSkillValue: ({pokemonProducingParams}) => pokemonProducingParams.skillValue,
  mainSkillTriggerValue: (opts) => {
    const {pokemonProducingParams} = opts;

    return getSkillTriggerValue({
      rate: getPokemonRateSorter(opts),
      skillValue: pokemonProducingParams.skillValue,
    });
  },
};

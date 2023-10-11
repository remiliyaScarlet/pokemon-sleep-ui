import {
  getBerryRateSorter,
  getIngredientFirstRateSorter,
  getIngredientTotalRateSorter,
  getPokemonRateSorter,
} from '@/components/shared/pokemon/sorter/calc/sorter';
import {PokemonSorterGetter, PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {defaultHelperCount, defaultSubSkillBonus} from '@/const/game/production';
import {getMainSkillTriggerValue} from '@/utils/game/mainSkill/utils';
import {getEquivalentFrequencyFromPokemonRate} from '@/utils/game/producing/frequency';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';


export const sortInAsc: PokemonSortType[] = [
  'id',
  'frequencyBase',
  'frequency',
  'frequencyOfBerry',
  'frequencyOfIngredient',
  'friendshipPoint',
];

const getFrequency: PokemonSorterGetter = ({helperCount, subSkillBonus, calculatedSettings, ...opts}) => (
  getEquivalentFrequencyFromPokemonRate({
    state: 'equivalent',
    rate: getPokemonProducingRate({
      helperCount: helperCount ?? defaultHelperCount,
      subSkillBonus: subSkillBonus ?? defaultSubSkillBonus,
      ...calculatedSettings,
      ...opts,
    }),
  })
);

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
  frequency: getFrequency,
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
    const frequency = getFrequency(opts);

    return getMainSkillTriggerValue({skillValue: pokemonProducingParams.skillValue, frequency});
  },
};

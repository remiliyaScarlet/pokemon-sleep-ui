import {natureData} from '@/data/nature';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {
  RatingBasis,
  RatingCombination,
  RatingDataPoint,
  RatingResultOfLevel,
  RatingWorkerOpts,
} from '@/types/game/pokemon/rating';
import {PokemonProducingRate, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';
import {getSkillTriggerValue} from '@/utils/game/mainSkill/utils';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getDailyEnergyOfRate} from '@/utils/game/producing/rate';
import {generatePossiblePokemonSubSkills} from '@/utils/game/subSkill';
import {isNotNullish} from '@/utils/type';


type GetRatingBasisValueOpts = {
  rate: PokemonProducingRate,
  basis: RatingBasis,
  pokemonProducingParams: PokemonProducingParams,
  singleParams: ProducingRateSingleParams,
};

const getRatingBasisValue = ({
  rate,
  basis,
  pokemonProducingParams,
  singleParams,
}: GetRatingBasisValueOpts): number => {
  if (basis === 'totalProduction') {
    return getDailyEnergyOfRate(rate);
  }

  if (basis === 'ingredientCount') {
    return toSum(Object.values(rate.ingredient).map(({quantity}) => quantity.equivalent));
  }

  if (basis === 'ingredientProduction') {
    return toSum(Object.values(rate.ingredient).map(({energy}) => energy.equivalent));
  }

  if (basis === 'skillTriggerValue') {
    return getSkillTriggerValue({
      rate,
      skillValue: pokemonProducingParams.skillValue,
      ...singleParams,
    });
  }

  throw new Error(`Unhandled rating basis - ${basis satisfies never}`);
};

export const calculateRatingResultOfLevel = (opts: RatingWorkerOpts): RatingResultOfLevel | null => {
  const {
    level,
    pokemon,
    ingredients,
    subSkill,
    nature,
    ingredientChainMap,
    berryDataMap,
    subSkillMap,
  } = opts;

  if (!pokemon) {
    return null;
  }

  const chain = ingredientChainMap[pokemon.ingredientChain];
  const berryData = berryDataMap[pokemon.berry.id];
  const currentProductions = getEffectiveIngredientProductions({level, ingredients});
  const subSkillData = Object.values(subSkillMap).filter(isNotNullish);
  const noCap = true;

  const singleParamsOfCurrent = getProducingRateSingleParams(opts);
  const valueOfCurrent = getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRate({
      ...opts,
      pokemon,
      berryData,
      ingredients: currentProductions,
      ...singleParamsOfCurrent,
      noCap,
    }),
    singleParams: singleParamsOfCurrent,
  });

  const singleParamsOfBase = getProducingRateSingleParams({
    level,
    subSkill: {},
    nature: null,
    subSkillMap,
  });
  const valueOfBase = getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRate({
      ...opts,
      // Override `evolutionCount` in `opts` to apply default evolution count of the Pokémon
      evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
      pokemon,
      berryData,
      ingredients: currentProductions,
      ...singleParamsOfBase,
      noCap,
    }),
    singleParams: singleParamsOfBase,
  });

  const natureIds = natureData.map(({id}) => id);

  let samples = 0;
  let rank = 1;
  let min: RatingDataPoint | null = null;
  let max: RatingDataPoint | null = null;

  for (const productions of generatePossibleIngredientProductions({level, chain})) {
    for (const subSkill of generatePossiblePokemonSubSkills({level, subSkillData})) {
      for (const natureId of natureIds) {
        samples++;

        const singleParamsOfPossibility = getProducingRateSingleParams({
          level,
          subSkill,
          nature: natureId,
          subSkillMap,
        });
        const valueOfPossibility = getRatingBasisValue({
          ...opts,
          rate: getPokemonProducingRate({
            ...opts,
            pokemon,
            berryData,
            ingredients: productions,
            ...singleParamsOfPossibility,
            noCap,
          }),
          singleParams: singleParamsOfPossibility,
        });
        if (valueOfPossibility > valueOfCurrent) {
          rank++;
        }

        const combination: RatingCombination = {productions, natureId, subSkill};

        if (!min || valueOfPossibility < min.value) {
          min = {value: valueOfPossibility, combination};
        }
        if (!max || valueOfPossibility > max.value) {
          max = {value: valueOfPossibility, combination};
        }
      }
    }
  }

  return {
    level,
    samples,
    rank,
    percentage: min && max ? Math.abs((valueOfCurrent - min.value) / (max.value - min.value) * 100) : NaN,
    percentile: Math.abs((samples + 1 - rank) / (samples + 1) * 100),
    baseDiffPercent: (valueOfCurrent / valueOfBase - 1) * 100,
    points: {
      min,
      current: {
        value: valueOfCurrent,
        combination: {
          productions: currentProductions,
          subSkill,
          natureId: nature,
        },
      },
      max,
    },
  };
};

import {natureData} from '@/data/nature';
import {
  RatingCombination,
  RatingDataPoint,
  RatingResultOfLevel,
  RatingWorkerOpts,
} from '@/types/game/pokemon/rating';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getDailyEnergyOfRate} from '@/utils/game/producing/rate';
import {generatePossiblePokemonSubSkills} from '@/utils/game/subSkill';
import {isNotNullish} from '@/utils/type';


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

  const currentRate = getPokemonProducingRate({
    ...opts,
    pokemon,
    berryData,
    ingredients: currentProductions,
    ...getProducingRateSingleParams(opts),
    noCap,
  });
  const currentDaily = getDailyEnergyOfRate(currentRate);
  const baseDaily = getDailyEnergyOfRate(getPokemonProducingRate({
    ...opts,
    // Override `evolutionCount` in `opts` to apply default evolution count of the Pokémon
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
    pokemon,
    berryData,
    ingredients: currentProductions,
    ...getProducingRateSingleParams({
      level,
      subSkill: {},
      nature: null,
      subSkillMap,
    }),
    noCap,
  }));

  const natureIds = natureData.map(({id}) => id);

  let samples = 0;
  let rank = 1;
  let min: RatingDataPoint | null = null;
  let max: RatingDataPoint | null = null;

  for (const productions of generatePossibleIngredientProductions({level, chain})) {
    for (const subSkill of generatePossiblePokemonSubSkills({level, subSkillData})) {
      for (const natureId of natureIds) {
        samples++;

        const dailyOfPossibility = getDailyEnergyOfRate(getPokemonProducingRate({
          ...opts,
          pokemon,
          berryData,
          ingredients: productions,
          ...getProducingRateSingleParams({
            level,
            subSkill,
            nature: natureId,
            subSkillMap,
          }),
          noCap,
        }));
        if (dailyOfPossibility > currentDaily) {
          rank++;
        }

        const combination: RatingCombination = {productions, natureId, subSkill};

        if (!min || dailyOfPossibility < min.value) {
          min = {value: dailyOfPossibility, combination};
        }
        if (!max || dailyOfPossibility > max.value) {
          max = {value: dailyOfPossibility, combination};
        }
      }
    }
  }

  return {
    level,
    samples,
    rank,
    percentage: min && max ? Math.abs((currentDaily - min.value) / (max.value - min.value) * 100) : NaN,
    percentile: Math.abs((samples + 1 - rank) / (samples + 1) * 100),
    baseDiffPercent: (currentDaily / baseDaily - 1) * 100,
    points: {
      min,
      current: {
        value: currentDaily,
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

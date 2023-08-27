import {natureData} from '@/data/nature';
import {getDailyEnergyOfRate} from '@/ui/analysis/page/calc/producingRate/utils';
import {initialResult} from '@/ui/rating/calc/const';
import {RatingCombination, RatingDataPoint, RatingResult} from '@/ui/rating/result/type';
import {RatingWorkerOpts} from '@/ui/rating/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {generatePossiblePokemonSubSkills} from '@/utils/game/subSkill';
import {isNotNullish} from '@/utils/type';


const calculateRatingResult = (data: RatingWorkerOpts): RatingResult => {
  const {
    level,
    pokemon,
    ingredients,
    subSkill,
    nature,
    ingredientChainMap,
    berryDataMap,
    subSkillMap,
    bonus,
  } = data;

  if (!pokemon) {
    return initialResult;
  }

  const chain = ingredientChainMap[pokemon.ingredientChain];
  const berryData = berryDataMap[pokemon.berry.id];
  const currentProductions = getEffectiveIngredientProductions({level, ingredients});
  const subSkillData = Object.values(subSkillMap).filter(isNotNullish);

  const currentRate = getPokemonProducingRate({
    ...data,
    pokemon,
    berryData,
    ingredients: currentProductions,
    ingredientBonus: bonus.ingredient,
    ...getProducingRateSingleParams({
      level,
      subSkill,
      nature,
      subSkillMap,
    }),
  });
  const currentDaily = getDailyEnergyOfRate(currentRate);

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
          ...data,
          pokemon,
          berryData,
          ingredients: productions,
          ingredientBonus: bonus.ingredient,
          ...getProducingRateSingleParams({
            level,
            subSkill,
            nature: natureId,
            subSkillMap,
          }),
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
    samples,
    rank,
    percentage: min && max ? Math.abs((currentDaily - min.value) / (max.value - min.value) * 100) : NaN,
    percentile: Math.abs((samples + 1 - rank) / (samples + 1) * 100),
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

const onMessage = (event: MessageEvent<RatingWorkerOpts>) => {
  postMessage(calculateRatingResult(event.data));
};

addEventListener('message', onMessage);

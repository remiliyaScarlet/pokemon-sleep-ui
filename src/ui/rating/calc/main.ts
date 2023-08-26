import {natureData} from '@/data/nature';
import {getDailyEnergyOfRate} from '@/ui/analysis/page/calc/producingRate/utils';
import {RatingResult} from '@/ui/rating/result/type';
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
  } = data;

  if (!pokemon) {
    return {
      samples: 1,
      rank: 1,
      percentage: 1,
      percentile: 50,
    };
  }

  const chain = ingredientChainMap[pokemon.ingredientChain];
  const berryData = berryDataMap[pokemon.berry.id];
  const subSkillData = Object.values(subSkillMap).filter(isNotNullish);

  const currentRate = getPokemonProducingRate({
    ...data,
    pokemon,
    berryData,
    ingredients: getEffectiveIngredientProductions({level, ingredients}),
    ...getProducingRateSingleParams({
      level,
      subSkill,
      nature,
      subSkillMap,
    }),
  });
  const currentDaily = getDailyEnergyOfRate(currentRate);

  const productions = generatePossibleIngredientProductions({level, chain});
  const subSkills = generatePossiblePokemonSubSkills({level, subSkillData});
  const natureIds = natureData.map(({id}) => id);

  let samples = 1;
  let rank = 1;
  let min = NaN;
  let max = NaN;

  for (const production of productions) {
    for (const subSkill of subSkills) {
      for (const natureId of natureIds) {
        samples++;

        const dailyOfPossibility = getDailyEnergyOfRate(getPokemonProducingRate({
          ...data,
          pokemon,
          berryData,
          ingredients: production,
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

        min = isNaN(min) ? dailyOfPossibility : Math.min(min, dailyOfPossibility);
        max = isNaN(max) ? dailyOfPossibility : Math.max(max, dailyOfPossibility);
      }
    }
  }

  return {
    samples,
    rank,
    percentage: Math.abs((currentDaily - min) / (max - min) * 100),
    percentile: Math.abs((samples + 1 - rank) / (samples + 1) * 100),
  };
};

const onMessage = (event: MessageEvent<RatingWorkerOpts>) => {
  postMessage(calculateRatingResult(event.data));
};

addEventListener('message', onMessage);

import {natureData} from '@/data/nature';
import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {RatingDataPoint, RatingResultOfLevel} from '@/types/game/pokemon/rating/result';
import {isNestedWorkerSupported} from '@/utils/compatibility/nestedWorker';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getRatingValueOfBase} from '@/utils/game/rating/base';
import {calculateRatingValueFromPayload} from '@/utils/game/rating/calc/fromPayload';
import {CalculateRatingDataWorkerOpts} from '@/utils/game/rating/calc/type';
import {getRatingValueOfCurrent} from '@/utils/game/rating/current';
import {isNotNullish} from '@/utils/type';


export const calculateRatingResultOfLevel = async (opts: RatingWorkerOpts): Promise<RatingResultOfLevel | null> => {
  const {
    basis,
    level,
    pokemon,
    ingredients,
    subSkill,
    nature,
    ingredientChainMap,
    berryDataMap,
    mainSkillMap,
    subSkillMap,
    useNestedWorker,
  } = opts;

  if (!pokemon) {
    return null;
  }

  const {ingredientChain, berry, skill} = pokemon;

  const chain = ingredientChainMap[ingredientChain];
  const berryData = berryDataMap[berry.id];
  const skillData = mainSkillMap[skill];

  const currentProductions = getEffectiveIngredientProductions({level, ingredients});

  const valueOfCurrent = getRatingValueOfCurrent({
    ...opts,
    berryData,
    ingredients: currentProductions,
    skillData,
  });
  const valueOfBase = getRatingValueOfBase({
    ...opts,
    berryData,
    ingredients: currentProductions,
    skillData,
  });

  const subSkillData = Object.values(subSkillMap).filter(isNotNullish);
  const natureIds = natureData.map(({id}) => id);

  let samples = 0;
  let rank = 1;
  let min: RatingDataPoint | null = null;
  let max: RatingDataPoint | null = null;

  // `ingredientCount` should only get compared within the same combination
  const ingredientProductions = basis == 'ingredientCount' ?
    [getEffectiveIngredientProductions({level, ingredients})] :
    generatePossibleIngredientProductions({level, chain});

  const promises: Promise<RatingDataPoint[]>[] = [];
  const runAsNestedWorker = useNestedWorker && level >= 50 && isNestedWorkerSupported();
  for (const ingredients of ingredientProductions) {
    const calcOpts: CalculateRatingDataWorkerOpts = {
      ...opts,
      berryData,
      skillData,
      ingredients,
      subSkillData,
      natureIds,
    };

    promises.push(new Promise<RatingDataPoint[]>((resolve) => {
      // Only use worker when the level is >= 50,
      // because the overhead of creating multiple workers is
      // greater than the time needed of doing the calculation directly in here
      if (runAsNestedWorker) {
        const worker = new Worker(new URL('fromPayload.worker', import.meta.url));
        worker.postMessage(calcOpts);
        worker.onmessage = ({data}: MessageEvent<RatingDataPoint[]>) => {
          resolve(data);
          worker.terminate();
        };
      } else {
        resolve(calculateRatingValueFromPayload(calcOpts));
      }
    }));
  }

  const dataPoints = (await Promise.all(promises)).flat();

  for (const dataPoint of dataPoints) {
    const {value} = dataPoint;
    samples++;

    if (value > valueOfCurrent) {
      rank++;
    }

    if (!min || value < min.value) {
      min = dataPoint;
    }
    if (!max || value > max.value) {
      max = dataPoint;
    }
  }

  const isValid = min?.value !== max?.value;

  return {
    level,
    samples,
    rank: isValid ? rank : NaN,
    percentage: isValid && min && max ? Math.abs((valueOfCurrent - min.value) / (max.value - min.value) * 100) : NaN,
    percentile: isValid ? Math.abs((samples + 1 - rank) / (samples + 1) * 100) : NaN,
    baseDiffPercent: (valueOfCurrent / valueOfBase - 1) * 100,
    points: {
      min,
      current: {
        value: valueOfCurrent,
        combination: {
          ingredients: currentProductions,
          subSkill,
          nature,
        },
      },
      max,
    },
  };
};

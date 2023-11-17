import {natureData} from '@/data/nature';
import {
  RatingCombination,
  RatingDataPoint,
  RatingResultOfLevel,
  RatingWorkerOpts,
} from '@/types/game/pokemon/rating';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getRatingValueOfBase} from '@/utils/game/rating/base';
import {getRatingValueOfCurrent} from '@/utils/game/rating/current';
import {getRatingValueOfPossibility} from '@/utils/game/rating/possibility';
import {generatePossiblePokemonSubSkills} from '@/utils/game/subSkill/generate';
import {isNotNullish} from '@/utils/type';


export const calculateRatingResultOfLevel = (opts: RatingWorkerOpts): RatingResultOfLevel | null => {
  const {
    basis,
    level,
    friendshipLevel,
    pokemon,
    ingredients,
    subSkill,
    nature,
    ingredientChainMap,
    berryDataMap,
    mainSkillMap,
    subSkillMap,
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

  for (const ingredients of ingredientProductions) {
    for (const subSkill of generatePossiblePokemonSubSkills({
      level,
      subSkillData,
      friendshipLevel,
    })) {
      for (const nature of natureIds) {
        samples++;

        const valueOfPossibility = getRatingValueOfPossibility({
          ...opts,
          berryData,
          skillData,
          override: {
            nature,
            subSkill,
            ingredients,
          },
        });
        if (valueOfPossibility > valueOfCurrent) {
          rank++;
        }

        const combination: RatingCombination = {ingredients, nature, subSkill};

        if (!min || valueOfPossibility < min.value) {
          min = {value: valueOfPossibility, combination};
        }
        if (!max || valueOfPossibility > max.value) {
          max = {value: valueOfPossibility, combination};
        }
      }
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

import {candyExpEquivalent} from '@/const/game/xp';
import {PokemonExpData} from '@/types/game/pokemon/xp';
import {PokemonLevelUpRequirements} from '@/ui/xp/results/type';
import {PokemonExpCalculatorParams} from '@/ui/xp/type';


type GetExpDataWithMultiplierOpts = {
  xpData: PokemonExpData[],
  multiplier: number,
};

export const getExpDataWithMultiplier = ({xpData, multiplier}: GetExpDataWithMultiplierOpts): PokemonExpData[] => {
  return xpData.map((data) => ({
    ...data,
    toNext: Math.ceil(data.toNext * multiplier),
    totalGained: Math.ceil(data.totalGained * multiplier),
  }));
};

type GetItemsRequiredOpts = PokemonExpCalculatorParams & {
  xpData: PokemonExpData[],
  multiplier: number,
};

export const getLevelUpRequirementsOfEachLevel = ({
  xpToNext,
  currentLv,
  ownedCandies,
  xpData,
  multiplier,
}: GetItemsRequiredOpts): PokemonLevelUpRequirements[] => {
  // `currentLv` could be `0` if current level is deleted
  if (!currentLv) {
    return [];
  }

  const expDataCurrentLevel = xpData[currentLv - 1];
  const expToNextCurrent = expDataCurrentLevel.toNext - xpToNext;
  const expDataInRange: PokemonExpData[] = [
    {
      ...expDataCurrentLevel,
      lv: currentLv,
      toNext: xpToNext,
      totalGained: expDataCurrentLevel.totalGained + (expDataCurrentLevel.toNext - expToNextCurrent),
    },
    ...xpData.slice(currentLv),
  ];

  const actualCandyExpEquivalent = Math.ceil(candyExpEquivalent * multiplier);
  const itemsRequired: PokemonLevelUpRequirements[] = [];

  let overfeedExp = 0;
  for (const {lv, toNext, shardPerCandy} of expDataInRange) {
    const expToNextActual = toNext - overfeedExp;
    const candyActual = Math.ceil(expToNextActual / actualCandyExpEquivalent);

    const candyDeductible = Math.min(candyActual, ownedCandies);
    ownedCandies = Math.max(0, ownedCandies - candyDeductible);

    const candySpent = candyActual - candyDeductible;

    itemsRequired.push({
      lv: lv + 1,
      xp: toNext,
      candy: candySpent,
      shard: candySpent * (shardPerCandy ?? NaN),
    });

    overfeedExp = candyActual * actualCandyExpEquivalent - expToNextActual;
  }

  return itemsRequired;
};

export const getLevelUpRequirementsAccumulated = (
  requirementsOfLevel: PokemonLevelUpRequirements[],
): PokemonLevelUpRequirements[] => {
  const ret: PokemonLevelUpRequirements[] = [];

  for (const requirements of requirementsOfLevel) {
    const last = ret.at(-1);

    if (!last) {
      ret.push(requirements);
      continue;
    }

    ret.push({
      lv: requirements.lv,
      xp: last.xp + requirements.xp,
      candy: last.candy + requirements.candy,
      shard: last.shard + requirements.shard,
    });
  }

  return ret;
};

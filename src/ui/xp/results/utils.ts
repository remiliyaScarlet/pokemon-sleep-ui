import {candyExpEquivalent} from '@/const/game/xp';


type GetCandiesRequiredOpts = {
  expToNext: number,
  multiplier: number,
  ownedCandies: number,
};

export const getCandiesRequired = ({expToNext, multiplier, ownedCandies}: GetCandiesRequiredOpts) => {
  return expToNext / Math.ceil(candyExpEquivalent * multiplier) - ownedCandies;
};

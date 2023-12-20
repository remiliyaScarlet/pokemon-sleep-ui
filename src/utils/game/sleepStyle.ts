import {spoToScoreMultiplier} from '@/const/game/sleepStyle';


export const getDrowsyScoreRequirementFromSpo = (spo: number) => {
  return spo * spoToScoreMultiplier;
};

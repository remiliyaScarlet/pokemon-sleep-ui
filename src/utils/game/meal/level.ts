import {recipeLevelData} from '@/data/recipeLevel';
import {RecipeLevelData} from '@/types/game/meal/level';


export const getRecipeLevelData = (level: number): RecipeLevelData => {
  return recipeLevelData[level - 1];
};

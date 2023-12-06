import {recipeLevelData} from '@/data/recipeLevel';
import {RecipeLevelData} from '@/types/game/meal/level';


export const getRecipeLevelData = (level: number): RecipeLevelData | undefined => {
  return recipeLevelData.at(level - 1);
};

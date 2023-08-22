import {clsx} from 'clsx';

import {MealTypeClassMap} from '@/styles/type';
import {SubSkillRarity} from '@/types/game/pokemon/subskill';


export const mealTypeBackgroundStyle: MealTypeClassMap = {
  1: 'meal-bg-curry',
  2: 'meal-bg-salad',
  3: 'meal-bg-dessert',
};

export const mealTypeTextStyle: MealTypeClassMap = {
  1: 'meal-text-curry',
  2: 'meal-text-salad',
  3: 'meal-text-dessert',
};

export const mealTypeDotStyle: MealTypeClassMap = {
  1: 'meal-dot-curry',
  2: 'meal-dot-salad',
  3: 'meal-dot-dessert',
};

export const subSkillRaritySectionBg: {[rarity in SubSkillRarity]: string} = {
  1: 'border border-transparent bg-slate-300 dark:bg-slate-800/90',
  2: 'border border-transparent bg-sky-400/30 dark:bg-sky-500/30',
  3: 'border border-transparent bg-amber-400/40 dark:bg-yellow-700/40',
};

export const subSkillRarityIconFilter: {[rarity in SubSkillRarity]: string} = {
  1: 'filter-subskill-slate-500',
  2: 'filter-subskill-sky-500',
  3: 'filter-subskill-yellow-500',
};

export const subSkillRarityDisabled = 'border border-slate-500 text-slate-500';

export const dangerText = clsx(
  'transform-smooth text-red-600 group-hover:text-red-400',
  'dark:text-red-400 dark:group-hover:text-red-600',
);

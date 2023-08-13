import {MealTypeClassMap, SleepTypeClassMap, SpecialtyClassMap} from '@/styles/type';
import {SubSkillRarity} from '@/types/game/pokemon/subskill';


export const sleepTypeBgClass: SleepTypeClassMap = {
  0: 'bg-sleep-dark-deep dark:bg-sleep-deep',
  1: 'bg-sleep-dark-light dark:bg-sleep-light',
  4: 'bg-sleep-dark-awake dark:bg-sleep-awake',
};

export const sleepTypeTextClass: SleepTypeClassMap = {
  0: 'text-sleep-dark-deep dark:text-sleep-deep',
  1: 'text-sleep-dark-light dark:text-sleep-light',
  4: 'text-sleep-dark-awake dark:text-sleep-awake',
};

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

export const specialtyTextClass: SpecialtyClassMap = {
  1: 'text-green-700 dark:text-green-500',
  2: 'text-amber-600 dark:text-yellow-400',
  3: 'text-blue-600 dark:text-blue-400',
};

export const subSkillRarityBg: {[rarity in SubSkillRarity]: string} = {
  1: 'bg-slate-300 dark:bg-slate-800/90',
  2: 'bg-sky-300 dark:bg-sky-700/30',
  3: 'bg-yellow-300 dark:bg-yellow-700/40',
};

export const subSkillRarityDisabled = 'border border-slate-500 text-slate-500';

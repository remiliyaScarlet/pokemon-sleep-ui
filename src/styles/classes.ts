import {clsx} from 'clsx';

import {MealTypeClassMap, SleepTypeClassMap, SpecialtyClassMap} from '@/styles/type';
import {SubSkillRarity} from '@/types/game/pokemon/subskill';


export const sleepTypeBgClass: SleepTypeClassMap = {
  0: clsx(
    'transform-smooth bg-sleep-dark-deep dark:bg-sleep-deep',
    'group-hover:bg-sleep-deep group-hover:dark:bg-sleep-dark-deep',
  ),
  1: clsx(
    'transform-smooth bg-sleep-dark-light dark:bg-sleep-light',
    'group-hover:bg-sleep-light group-hover:dark:bg-sleep-dark-light',
  ),
  4: clsx(
    'transform-smooth bg-sleep-dark-awake dark:bg-sleep-awake',
    'group-hover:bg-sleep-awake group-hover:dark:bg-sleep-dark-awake',
  ),
};

export const sleepTypeTextClass: SleepTypeClassMap = {
  0: clsx(
    'transform-smooth text-sleep-dark-deep dark:text-sleep-deep',
    'group-hover:text-sleep-deep group-hover:dark:text-sleep-dark-deep',
  ),
  1: clsx(
    'transform-smooth text-sleep-dark-light group-hover:text-sleep-light',
    'dark:text-sleep-light group-hover:dark:text-sleep-dark-light',
  ),
  4: clsx(
    'transform-smooth text-sleep-dark-awake dark:text-sleep-awake',
    'group-hover:text-sleep-awake group-hover:dark:text-sleep-dark-awake',
  ),
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

export const specialtyBgClass: SpecialtyClassMap = {
  1: clsx(
    'transform-smooth bg-green-700 dark:bg-green-500',
    'group-hover:bg-green-500 group-hover:dark:bg-green-700',
  ),
  2: clsx(
    'transform-smooth bg-amber-600 dark:bg-yellow-400',
    'group-hover:bg-yellow-400 group-hover:dark:bg-yellow-600',
  ),
  3: clsx(
    'transform-smooth bg-blue-600 dark:bg-blue-400',
    'group-hover:bg-blue-400 group-hover:dark:bg-blue-600',
  ),
};

export const specialtyTextClass: SpecialtyClassMap = {
  1: clsx(
    'transform-smooth text-green-700 dark:text-green-500',
    'group-hover:text-green-500 group-hover:dark:text-green-700',
  ),
  2: clsx(
    'transform-smooth text-amber-600 dark:text-yellow-400',
    'group-hover:text-yellow-400 group-hover:dark:text-amber-600',
  ),
  3: clsx(
    'transform-smooth text-blue-600 dark:text-blue-400',
    'group-hover:text-blue-400 group-hover:dark:text-blue-600',
  ),
};

export const subSkillRaritySectionBg: {[rarity in SubSkillRarity]: string} = {
  1: 'border border-transparent bg-slate-300 dark:bg-slate-800/90',
  2: 'border border-transparent bg-sky-400/30 dark:bg-sky-500/30',
  3: 'border border-transparent bg-amber-400/40 dark:bg-yellow-700/40',
};

export const subSkillRarityIconBg: {[rarity in SubSkillRarity]: string} = {
  1: 'bg-slate-300 dark:bg-slate-500',
  2: 'bg-sky-300 dark:bg-sky-500',
  3: 'bg-yellow-300 dark:bg-yellow-500',
};

export const subSkillRarityDisabled = 'border border-slate-500 text-slate-500';

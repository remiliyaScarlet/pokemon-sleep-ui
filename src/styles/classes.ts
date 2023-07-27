import {SleepTypeClassMap} from '@/styles/type';
import {MealTypeId} from '@/types/mongo/meal';
import {classNames} from '@/utils/react';


export const smoothTransform = 'transform-gpu transition-colors';

export const textShadow = 'shadow-slate-200 text-shadow dark:shadow-slate-900';

export const buttonStyle = {
  base: classNames('group rounded-lg', smoothTransform),
  size: 'p-1 h-8',
  background: 'hover:bg-slate-700 hover:dark:bg-slate-300',
  border: 'border border-slate-700 dark:border-slate-300',
  text: 'text-slate-700 dark:text-slate-300',
  textHover: 'hover:text-slate-200 dark:hover:text-slate-800',
  disabled: classNames(
    'bg-slate-400/50 dark:bg-slate-700/50 text-slate-500/70 dark:text-slate-500',
    'border border-slate-400/50 dark:border-slate-500',
  ),
};

export const buttonStyleEnabled = classNames(
  buttonStyle.base,
  buttonStyle.size,
  buttonStyle.background,
  buttonStyle.border,
  buttonStyle.text,
  buttonStyle.textHover,
);

export const invertStyle = {
  normal: 'invert dark:invert-0',
  hover: 'group-hover:invert-0 group-hover:dark:invert',
};

export const whiteHoverableClasses = {
  parent: classNames(buttonStyle.base, buttonStyle.background, buttonStyle.text, buttonStyle.textHover),
  icon: classNames(invertStyle.normal, invertStyle.hover),
};

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

export const mealTypeBackgroundStyle: {[type in MealTypeId]: string} = {
  1: 'bg-orange-300/40 hover:bg-orange-400/70 dark:bg-orange-700/40 hover:dark:bg-orange-700/90',
  2: 'bg-yellow-300/40 hover:bg-yellow-400/70 dark:bg-yellow-700/40 hover:dark:bg-yellow-700/90',
  3: 'bg-lime-300/40 hover:bg-lime-400/70 dark:bg-lime-700/40 hover:dark:bg-lime-700/90',
};

export const mealTypeActiveStyle: {[type in MealTypeId]: string} = {
  1: 'text-orange-800 ring-1 ring-inset ring-orange-800 dark:text-orange-200 dark:ring-orange-200',
  2: 'text-yellow-800 ring-1 ring-inset ring-yellow-800 dark:text-yellow-200 dark:ring-yellow-200',
  3: 'text-lime-800 ring-1 ring-inset ring-lime-800 dark:text-lime-200 dark:ring-lime-200',
};

export const mealTypeDotStyle: {[type in MealTypeId]: string} = {
  1: 'bg-orange-600 dark:bg-orange-500',
  2: 'bg-yellow-600 dark:bg-yellow-500',
  3: 'bg-lime-600 dark:bg-lime-500',
};

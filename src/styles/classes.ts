import {MealTypeClassMap, SleepTypeClassMap} from '@/styles/type';


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

export const mealTypeActiveStyle: MealTypeClassMap = {
  1: 'meal-active-curry',
  2: 'meal-active-salad',
  3: 'meal-active-dessert',
};

export const mealTypeDotStyle: MealTypeClassMap = {
  1: 'meal-dot-curry',
  2: 'meal-dot-salad',
  3: 'meal-dot-dessert',
};

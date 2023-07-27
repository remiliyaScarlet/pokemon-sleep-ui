import {MealTypeId} from '@/types/mongo/meal';


export const mealTypeBackgroundStyleClass: {[type in MealTypeId]: string} = {
  1: 'bg-orange-300/40 hover:bg-orange-400/70 dark:bg-orange-700/40 hover:dark:bg-orange-700/90',
  2: 'bg-yellow-300/40 hover:bg-yellow-400/70 dark:bg-yellow-700/40 hover:dark:bg-yellow-700/90',
  3: 'bg-lime-300/40 hover:bg-lime-400/70 dark:bg-lime-700/40 hover:dark:bg-lime-700/90',
};

export const mealTypeDotStyleClass: {[type in MealTypeId]: string} = {
  1: 'bg-orange-600 dark:bg-orange-500',
  2: 'bg-yellow-600 dark:bg-yellow-500',
  3: 'bg-lime-600 dark:bg-lime-500',
};

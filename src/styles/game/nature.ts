import {clsx} from 'clsx';


export const natureStyle = {
  buff: clsx(
    'transform-smooth text-green-800 group-enabled:group-hover:text-green-400',
    'dark:text-green-400 dark:group-enabled:group-hover:text-green-800',
  ),
  nerf: clsx(
    'transform-smooth text-red-700 group-enabled:group-hover:text-red-400',
    'dark:text-red-400 dark:group-enabled:group-hover:text-red-700',
  ),
  clean: clsx(
    'transform-smooth text-amber-700 group-enabled:group-hover:text-amber-400',
    'dark:text-amber-400 dark:group-enabled:group-hover:text-amber-700',
  ),
};

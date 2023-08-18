import {clsx} from 'clsx';

import {SleepTypeClassMap} from '@/styles/type';
import {PokemonSleepTypeId} from '@/types/mongo/pokemon';


const sleepTypeBgClassInactive: SleepTypeClassMap = {
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

const sleepTypeBgClassActive: SleepTypeClassMap = {
  0: clsx(
    'transform-smooth bg-sleep-deep dark:bg-sleep-dark-deep',
    'group-hover:bg-sleep-dark-deep group-hover:dark:bg-sleep-deep',
  ),
  1: clsx(
    'transform-smooth bg-sleep-light dark:bg-sleep-dark-light',
    'group-hover:bg-sleep-dark-light group-hover:dark:bg-sleep-light',
  ),
  4: clsx(
    'transform-smooth bg-sleep-awake dark:bg-sleep-dark-awake',
    'group-hover:bg-sleep-dark-awake group-hover:dark:bg-sleep-awake',
  ),
};

export const getSleepTypeBgClass = (sleepTypeId: PokemonSleepTypeId, isActive: boolean)=> (
  isActive ? sleepTypeBgClassActive[sleepTypeId] : sleepTypeBgClassInactive[sleepTypeId]
);

export const sleepTypeTextClassInactive: SleepTypeClassMap = {
  0: clsx(
    'transform-smooth text-sleep-dark-deep dark:text-sleep-deep',
    'group-hover:text-sleep-deep group-hover:dark:text-sleep-dark-deep',
  ),
  1: clsx(
    'transform-smooth text-sleep-dark-light group-hover:text-sleep-light',
    'dark:text-sleep-light group-hover:dark:text-sleep-dark-light',
    'peer-active:dark:text-sleep-dark-deep',
  ),
  4: clsx(
    'transform-smooth text-sleep-dark-awake dark:text-sleep-awake',
    'group-hover:text-sleep-awake group-hover:dark:text-sleep-dark-awake',
    'peer-active:dark:text-sleep-dark-deep',
  ),
};

const sleepTypeTextClassActive: SleepTypeClassMap = {
  0: clsx(
    'transform-smooth text-sleep-deep dark:text-sleep-dark-deep',
    'group-hover:text-sleep-dark-deep group-hover:dark:text-sleep-deep',
  ),
  1: clsx(
    'transform-smooth text-sleep-light dark:text-sleep-dark-light',
    'group-hover:text-sleep-dark-light group-hover:dark:text-sleep-light',
  ),
  4: clsx(
    'transform-smooth text-sleep-awake dark:text-sleep-dark-awake',
    'group-hover:text-sleep-dark-awake group-hover:dark:text-sleep-awake',
  ),
};

export const getSleepTypeTextClass = (sleepTypeId: PokemonSleepTypeId, isActive: boolean)=> (
  isActive ? sleepTypeTextClassActive[sleepTypeId] : sleepTypeTextClassInactive[sleepTypeId]
);

import {classNames} from '@/utils/react';


export const whiteHoverableClasses = {
  parent: classNames(
    'group transform-gpu transition-colors rounded-lg',
    'hover:bg-slate-700 hover:text-slate-200',
    'hover:dark:bg-slate-300 hover:dark:text-neutral-950',
  ),
  icon: 'invert dark:invert-0 group-hover:invert-0 group-hover:dark:invert',
};

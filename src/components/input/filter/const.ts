import {FilterRowBackgroundStyle} from '@/components/input/filter/type';


export const toggleClass = {
  active: {
    hover: 'hover:bg-slate-500 dark:hover:bg-slate-400 hover:text-slate-100 dark:hover:text-slate-800',
    background: 'bg-slate-800 text-slate-100 dark:bg-slate-50 dark:text-slate-800',
  },
  inactive: {
    hover: 'hover:bg-slate-400 dark:hover:bg-slate-500 hover:text-slate-900 dark:hover:text-slate-100',
    background: 'bg-slate-400/20 dark:bg-slate-700/50',
  },
};

export const rowBackground: {[style in FilterRowBackgroundStyle]: string} = {
  none: '',
  normal: 'bg-slate-50/40 dark:bg-slate-700/20',
  highlight: 'bg-slate-50 dark:bg-slate-700/50',
};

import {clsx} from 'clsx';


export const popupWindowStyle = clsx(
  'flex w-full flex-col justify-center rounded-lg sm:w-fit',
  'border border-slate-400 bg-slate-200 dark:bg-gray-950 dark:ring-gray-600',
);

export const popupOverlayStyle = clsx(
  'transform-smooth fixed inset-0 flex items-center justify-center p-4 text-center',
);

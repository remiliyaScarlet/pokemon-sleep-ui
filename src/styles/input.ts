import {clsx} from 'clsx';


export const getToggleButtonClass = (isActive: boolean) => clsx(
  isActive ? 'button-toggle-active' : 'button-toggle-inactive',
);

const filterInputButtonStyle = 'relative h-8 rounded-full';

export const textFilterButtonStyle = clsx(
  'whitespace-nowrap px-2 text-sm',
  filterInputButtonStyle,
);

export const iconFilterButtonStyle = clsx('w-8', filterInputButtonStyle);

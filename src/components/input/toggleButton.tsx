import React from 'react';

import {clsx} from 'clsx';

import {getToggleButtonClass} from '@/components/input/filter/utils/props';


export type ToggleButtonProps = {
  active: boolean,
  onClick?: () => void,
  disabled?: boolean,
  className?: string,
};

export const ToggleButton = ({
  active,
  onClick,
  className,
  disabled,
  children,
}: React.PropsWithChildren<ToggleButtonProps>) => {
  return (
    <button onClick={onClick} disabled={disabled} className={clsx(
      'transform-smooth flex items-center justify-center',
      getToggleButtonClass(active),
      className,
    )}>
      {children}
    </button>
  );
};

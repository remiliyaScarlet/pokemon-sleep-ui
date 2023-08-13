import React from 'react';

import {clsx} from 'clsx';


export type ToggleButtonProps = {
  active: boolean,
  id: string,
  onClick?: () => void,
  onChange?: (checked: boolean) => void,
  disabled?: boolean,
  className?: string,
};

export const ToggleButton = ({
  active,
  id,
  onClick,
  onChange,
  className,
  disabled,
  children,
}: React.PropsWithChildren<ToggleButtonProps>) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="peer hidden"
        checked={active}
        onClick={onClick}
        onChange={(e) => onChange && onChange(e.target.checked)}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={clsx('transform-smooth flex cursor-pointer select-none items-center justify-center', className)}
      >
        {children}
      </label>
    </>
  );
};

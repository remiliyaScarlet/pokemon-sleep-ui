import React from 'react';

import {classNames} from '@/utils/react';


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
        className={classNames(
          'flex items-center justify-center cursor-pointer select-none transform-smooth',
          className,
        )}
      >
        {children}
      </label>
    </>
  );
};

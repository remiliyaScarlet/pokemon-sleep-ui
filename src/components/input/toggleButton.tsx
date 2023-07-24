import React from 'react';

import {classNames} from '@/utils/react';


export type ToggleButtonProps = {
  active: boolean,
  id: string,
  onChange: () => void,
  disabled?: boolean,
  className?: string,
};

export const ToggleButton = ({
  active,
  id,
  onChange,
  className,
  disabled,
  children,
}: React.PropsWithChildren<ToggleButtonProps>) => {
  return (
    <>
      <input type="checkbox" id={id} className="peer hidden" checked={active} onChange={onChange} disabled={disabled}/>
      <label
        htmlFor={id}
        className={classNames('flex items-center justify-center cursor-pointer select-none', className)}
      >
        {children}
      </label>
    </>
  );
};

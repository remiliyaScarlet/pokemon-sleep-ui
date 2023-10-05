import React from 'react';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


type Props = FlexCommonProps & {
  onClick: () => void,
  disabled?: boolean,
};

export const FlexButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<Props>>(({
  direction = 'row',
  noFullWidth = true,
  onClick,
  disabled,
  children,
  ...props
}, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    disabled={disabled}
    className={getFlexStyles(direction, {noFullWidth, ...props})}
  >
    {children}
  </button>
));
FlexButton.displayName = 'FlexButton';

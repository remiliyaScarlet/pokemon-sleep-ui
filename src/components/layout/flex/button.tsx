import React from 'react';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


type Props = FlexCommonProps & {
  onClick: () => void,
  disabled?: boolean,
};

const FlexButtonInternal = ({
  direction = 'row',
  noFullWidth = true,
  onClick,
  disabled,
  children,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLButtonElement>) => (
  <button
    ref={ref}
    onClick={onClick}
    disabled={disabled}
    className={getFlexStyles(direction, {noFullWidth, ...props})}
  >
    {children}
  </button>
);

export const FlexButton = React.forwardRef(FlexButtonInternal);

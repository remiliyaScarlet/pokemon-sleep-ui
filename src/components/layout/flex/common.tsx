import React from 'react';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


export const Flex = React.forwardRef<HTMLDivElement, React.PropsWithChildren<FlexCommonProps>>(({
  direction = 'col',
  children,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={getFlexStyles(direction, props)}>
      {children}
    </div>
  );
});
Flex.displayName = 'Flex';

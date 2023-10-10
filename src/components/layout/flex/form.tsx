import React from 'react';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


type Props = FlexCommonProps & {
  onSubmit?: () => void,
};

export const FlexForm = React.forwardRef<HTMLFormElement, React.PropsWithChildren<Props>>(({
  direction = 'col',
  children,
  onSubmit,
  ...props
}, ref) => {
  return (
    <form ref={ref} className={getFlexStyles(direction, props)} onSubmit={(e) => {
      e.preventDefault();

      if (onSubmit) {
        onSubmit();
      }
    }}>
      {children}
    </form>
  );
});
FlexForm.displayName = 'FlexForm';

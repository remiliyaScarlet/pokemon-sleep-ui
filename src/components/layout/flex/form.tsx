import React from 'react';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


type Props = FlexCommonProps & {
  onSubmit?: () => void,
};

const FlexFormInternal = ({
  direction = 'col',
  children,
  onSubmit,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLFormElement>) => {
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
};

export const FlexForm = React.forwardRef(FlexFormInternal);

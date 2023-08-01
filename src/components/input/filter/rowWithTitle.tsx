import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {InputRowProps} from '@/components/input/filter/type';


type Props = InputRowProps & {
  title: React.ReactNode,
};


export const InputRowWithTitle = ({
  title,
  children,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <InputRow {...props}>
      <div className="w-32 whitespace-nowrap text-center text-sm">
        {title}
      </div>
      {children}
    </InputRow>
  );
};

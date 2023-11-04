import React from 'react';

import {clsx} from 'clsx';

import {InputRow} from '@/components/input/filter/row';
import {InputRowProps} from '@/components/input/filter/type';


type Props = InputRowProps & {
  title: React.ReactNode,
};

export const InputRowWithTitle = ({
  noFixedTitleWidth,
  className,
  title,
  children,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <InputRow defaultAsCol wrap={false} {...props} className={clsx('sm:flex-row', className)}>
      <div className={clsx('shrink-0 whitespace-nowrap text-center text-sm', !noFixedTitleWidth && 'w-32')}>
        {title}
      </div>
      {children}
    </InputRow>
  );
};

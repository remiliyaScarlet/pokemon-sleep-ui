import React from 'react';

import {clsx} from 'clsx';

import {InputRow} from '@/components/input/filter/row';
import {InputRowProps} from '@/components/input/filter/type';


type Props = InputRowProps & {
  title: React.ReactNode,
  ender?: React.ReactNode,
  noFixedTitleWidth?: React.ReactNode,
};


export const InputRowWithTitle = ({
  title,
  ender,
  noFixedTitleWidth,
  children,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <InputRow {...props}>
      <div className={clsx('whitespace-nowrap text-center text-sm', !noFixedTitleWidth && 'w-32')}>
        {title}
      </div>
      {children}
      {ender && <div className="ml-auto">{ender}</div>}
    </InputRow>
  );
};

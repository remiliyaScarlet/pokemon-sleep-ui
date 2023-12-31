import React from 'react';

import {clsx} from 'clsx';

import {FilterInputLayoutProps} from '@/components/input/filter/common/type';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {Flex} from '@/components/layout/flex/common';


export const FilterInputLayout = ({
  title,
  children,
  // Explicit to avoid `className` getting passed despite the typing doesn't allow
  style,
  ender,
  noFixedTitleWidth,
  noRowPadding,
}: React.PropsWithChildren<FilterInputLayoutProps>) => {
  return (
    <InputRowWithTitle
      title={
        <Flex noFullWidth center className={clsx('whitespace-nowrap text-sm', !noFixedTitleWidth && 'w-32')}>
          {title}
        </Flex>
      }
      style={style}
      ender={ender}
      noFixedTitleWidth={noFixedTitleWidth}
      noRowPadding={noRowPadding}
    >
      {children}
    </InputRowWithTitle>
  );
};

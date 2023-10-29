import React from 'react';

import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {NumberInputLayoutProps} from '@/components/shared/input/number/common/type';
import {changeButtonClass} from '@/components/shared/input/number/const';
import {Nullable} from '@/utils/type';


export const NumberInputLayout = ({
  text,
  value,
  setValue,
  onClickDefault,
  min,
  max,
  className,
  textClassName,
  children,
}: React.PropsWithChildren<NumberInputLayoutProps<Nullable<number>>>) => {
  const inUseMin = min ?? -Infinity;
  const inUseMax = max ?? Infinity;

  const isValueNumber = typeof value === 'number';
  const isDefaultUnavailable = onClickDefault == null && !isValueNumber;

  return (
    <Flex direction="row" noFullWidth className={clsx('items-center gap-1.5', className)}>
      {
        text &&
        <div className={clsx('whitespace-nowrap', textClassName)}>
          {text}
        </div>
      }
      <button
        className={changeButtonClass}
        disabled={value === inUseMin || isDefaultUnavailable}
        onClick={() => setValue(isValueNumber ? Math.max(value - 1, inUseMin) : (onClickDefault ?? value))}
      >
        <ChevronDownIcon/>
      </button>
      {children}
      <button
        className={changeButtonClass}
        disabled={value === inUseMax || isDefaultUnavailable}
        onClick={() => setValue(isValueNumber ? Math.min(value + 1, inUseMax) : (onClickDefault ?? value))}
      >
        <ChevronUpIcon/>
      </button>
    </Flex>
  );
};

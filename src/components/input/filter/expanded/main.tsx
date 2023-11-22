import React from 'react';

import {clsx} from 'clsx';

import {FilterExpandedInputProps} from '@/components/input/filter/expanded/type';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {IndexableNonSymbol} from '@/utils/type';


export const FilterExpandedInput = <TId extends IndexableNonSymbol | null>({
  title,
  ids,
  idToButton,
  isHidden,
  onClick,
  isActive,
  classNameOfButton,
  noWrap,
  ...rowOpts
}: FilterExpandedInputProps<TId>) => {
  const {noFixedTitleWidth} = rowOpts;

  return (
    <InputRowWithTitle
      title={
        <div className={clsx('whitespace-nowrap text-center text-sm', !noFixedTitleWidth && 'w-32')}>
          {title}
        </div>
      }
      {...rowOpts}
    >
      <Flex direction="row" center wrap={!noWrap} className="gap-1 sm:justify-normal">
        {ids.map((id) => {
          const active = isActive(id);
          const hidden = isHidden && isHidden(id);

          if (hidden) {
            return null;
          }

          return (
            <ToggleButton
              key={id}
              active={active}
              onClick={() => onClick(id)}
              className={classNameOfButton}
            >
              {idToButton(id, active)}
            </ToggleButton>
          );
        })}
      </Flex>
    </InputRowWithTitle>
  );
};

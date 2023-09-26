import React from 'react';

import {clsx} from 'clsx';

import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';


export const FilterCategoryInput = <TId, >({
  title,
  ids,
  idToItemId,
  idToButton,
  isHidden,
  onClick,
  isActive,
  getClassNames,
  style,
  ender,
  noFixedTitleWidth,
  noRowPadding,
  noWrap,
}: FilterCategoryInputProps<TId>) => {
  return (
    <InputRowWithTitle
      style={style}
      title={
        <div className={clsx('whitespace-nowrap text-center text-sm', !noFixedTitleWidth && 'w-32')}>
          {title}
        </div>
      }
      ender={ender}
      noFixedTitleWidth={noFixedTitleWidth}
      noRowPadding={noRowPadding}
    >
      <Flex direction="row" className="gap-1 sm:justify-normal" center wrap={!noWrap}>
        {ids.map((id) => {
          const active = isActive(id);
          const hidden = isHidden && isHidden(id);
          const itemId = idToItemId(id);

          if (hidden) {
            return <React.Fragment key={itemId}/>;
          }

          return (
            <ToggleButton
              key={itemId}
              active={active}
              id={itemId}
              onClick={() => onClick(id)}
              className={getClassNames(active, id)}
            >
              {idToButton(id, active)}
            </ToggleButton>
          );
        })}
      </Flex>
    </InputRowWithTitle>
  );
};

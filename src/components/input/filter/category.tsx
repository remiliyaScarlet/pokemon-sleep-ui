import React from 'react';

import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';


export const FilterCategoryInput = <TId, >({
  title,
  ids,
  idToItemId,
  idToButton,
  onClick,
  isActive,
  getClassNames,
  style,
}: FilterCategoryInputProps<TId>) => {
  return (
    <InputRowWithTitle
      style={style}
      title={
        <div className="w-32 whitespace-nowrap text-center text-sm">
          {title}
        </div>
      }
    >
      <Flex direction="row" className="gap-1 sm:justify-normal" center wrap>
        {ids.map((id) => {
          const active = isActive(id);

          return (
            <ToggleButton
              key={idToItemId(id)}
              active={active}
              id={idToItemId(id)}
              onClick={() => onClick(id)}
              className={getClassNames(active, id)}
            >
              {idToButton(id)}
            </ToggleButton>
          );
        })}
      </Flex>
    </InputRowWithTitle>
  );
};

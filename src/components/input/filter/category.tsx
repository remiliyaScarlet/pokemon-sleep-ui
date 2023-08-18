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
  isHidden,
  onClick,
  isActive,
  getClassNames,
  style,
  ender,
}: FilterCategoryInputProps<TId>) => {
  return (
    <InputRowWithTitle
      style={style}
      title={
        <div className="w-32 whitespace-nowrap text-center text-sm">
          {title}
        </div>
      }
      ender={ender}
    >
      <Flex direction="row" className="gap-1 sm:justify-normal" center wrap>
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

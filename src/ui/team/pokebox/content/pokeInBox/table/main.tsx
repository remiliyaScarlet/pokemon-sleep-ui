import React from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeList} from 'react-window';

import {Flex} from '@/components/layout/flex/common';
import {PokeInBoxTableRow} from '@/ui/team/pokebox/content/pokeInBox/table/row';
import {PokeInBoxViewOfTypeProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeInBoxTable = ({
  filter,
  setEditingPokeInBox,
  sortedPokeInBox,
  ...props
}: PokeInBoxViewOfTypeProps) => {
  return (
    <Flex className="h-[70vh] gap-1 overflow-auto">
      <AutoSizer disableWidth>
        {({height}) => (
          <FixedSizeList
            height={height}
            itemCount={sortedPokeInBox.length}
            itemSize={51}
            itemData={sortedPokeInBox}
            width="100%"
            overscanCount={10}
          >
            {({style, data, index}) => {
              const {source} = data[index];
              const uuid = source.extra.uuid;

              // Extracting `width` out because it causes #187 (width not enough - sticky not in effect
              const {width, ...styleToUse} = style;

              return (
                <div key={uuid} style={styleToUse}>
                  <PokeInBoxTableRow
                    pokeInBox={source.extra}
                    display={filter}
                    snorlaxFavorite={filter.snorlaxFavorite}
                    onClick={() => setEditingPokeInBox({action: 'update', uuid})}
                    {...props}
                  />
                </div>
              );
            }}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Flex>
  );
};

import React from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeList} from 'react-window';

import {Flex} from '@/components/layout/flex';
import {PokeboxContentPokeInBoxRow} from '@/ui/team/pokebox/content/pokeInBox/table/row';
import {PokeInBoxViewOfTypeProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeboxContentPokeInBoxTable = ({
  filter,
  setEditingPokeInBox,
  sortedPokeInBox,
  ...props
}: PokeInBoxViewOfTypeProps) => {
  return (
    <Flex direction="col" className="h-[70vh] gap-1 overflow-auto">
      <AutoSizer>
        {({height, width}) => (
          <FixedSizeList
            height={height}
            itemCount={sortedPokeInBox.length}
            itemSize={51}
            itemData={sortedPokeInBox}
            width={width}
          >
            {({style, data, index}) => {
              const {source} = data[index];
              const uuid = source.extra.uuid;

              // Extracting `width` out because it causes #187 (width not enough - sticky not in effect
              const {width, ...styleToUse} = style;

              return (
                <div key={uuid} style={styleToUse}>
                  <PokeboxContentPokeInBoxRow
                    pokeInBox={source.extra}
                    displayType={filter.displayType}
                    snorlaxFavorite={filter.snorlaxFavorite}
                    bonus={filter.bonus}
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

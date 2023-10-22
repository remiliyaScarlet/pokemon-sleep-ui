import React from 'react';

import {clsx} from 'clsx';

import {Grid} from '@/components/layout/grid';
import {PokeInBoxGridCell} from '@/ui/team/pokebox/content/pokeInBox/grid/cell';
import {PokeInBoxViewOfTypeProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeInBoxGrid = ({
  filter,
  setEditingPokeInBox,
  sortedPokeInBox,
  ...props
}: PokeInBoxViewOfTypeProps) => {
  return (
    <div className="min-h-[40vh] w-full">
      <Grid className={clsx(
        'grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4',
      )}>
        {sortedPokeInBox.map(({source}) => {
          const uuid = source.extra.uuid;

          return (
            <PokeInBoxGridCell
              key={uuid}
              pokeInBox={source.extra}
              display={filter}
              snorlaxFavorite={filter.snorlaxFavorite}
              onClick={() => setEditingPokeInBox({action: 'update', uuid})}
              {...props}
            />
          );
        })}
      </Grid>
    </div>
  );
};

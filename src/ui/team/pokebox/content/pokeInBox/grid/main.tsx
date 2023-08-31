import React from 'react';

import {clsx} from 'clsx';

import {Grid} from '@/components/layout/grid';
import {PokeboxContentPokeInBoxCell} from '@/ui/team/pokebox/content/pokeInBox/grid/cell';
import {PokeInBoxViewOfTypeProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeboxContentPokeInBoxGrid = ({
  filter,
  setEditingPokeInBox,
  sortedPokeInBox,
  ...props
}: PokeInBoxViewOfTypeProps) => {
  return (
    <div className="min-h-[40vh] w-full">
      <Grid className={clsx(
        'grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
      )}>
        {sortedPokeInBox.map(({source}) => {
          const uuid = source.extra.uuid;

          return (
            <PokeboxContentPokeInBoxCell
              key={uuid}
              pokeInBox={source.extra}
              displayType={filter.displayType}
              snorlaxFavorite={filter.snorlaxFavorite}
              bonus={filter.bonus}
              onClick={() => setEditingPokeInBox({action: 'update', uuid})}
              {...props}
            />
          );
        })}
      </Grid>
    </div>
  );
};

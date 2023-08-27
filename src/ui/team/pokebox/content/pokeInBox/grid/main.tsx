import React from 'react';

import {clsx} from 'clsx';

import {Grid} from '@/components/layout/grid';
import {PokeboxContentPokeInBoxCell} from '@/ui/team/pokebox/content/pokeInBox/grid/cell';
import {PokeInBoxViewCommonProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeboxContentPokeInBoxGrid = ({
  filter,
  isIncluded,
  setEditingPokeInBox,
  sortedPokemonInfo,
  ...props
}: PokeInBoxViewCommonProps) => {
  return (
    <div className="min-h-[40vh] w-full">
      <Grid className={clsx(
        'grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
      )}>
        {sortedPokemonInfo.map(({source}) => {
          const uuid = source.extra.uuid;

          if (!isIncluded[uuid]) {
            return <React.Fragment key={uuid}/>;
          }

          return (
            <PokeboxContentPokeInBoxCell
              key={uuid}
              pokeInBox={source.extra}
              displayType={filter.displayType}
              snorlaxFavorite={filter.snorlaxFavorite}
              onClick={() => setEditingPokeInBox(source.extra)}
              {...props}
            />
          );
        })}
      </Grid>
    </div>
  );
};

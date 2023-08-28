import React from 'react';

import {PokeboxContentPokeInBoxGrid} from '@/ui/team/pokebox/content/pokeInBox/grid/main';
import {PokeboxContentPokeInBoxTable} from '@/ui/team/pokebox/content/pokeInBox/table/main';
import {PokeInBoxViewCommonProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {PokeboxRatingCache} from '@/ui/team/pokebox/content/type';


export const PokeboxPokeInBoxView = (props: PokeInBoxViewCommonProps) => {
  const {filter} = props;
  const [ratingCache, setRatingCache] = React.useState<PokeboxRatingCache>({});

  if (filter.viewType === 'table') {
    return (
      <PokeboxContentPokeInBoxTable
        ratingCache={ratingCache}
        setRatingCache={(uuid, result) => setRatingCache((cache) => ({
          ...cache,
          [uuid]: result,
        }))}
        {...props}
      />
    );
  }

  if (filter.viewType === 'grid') {
    return (
      <PokeboxContentPokeInBoxGrid
        ratingCache={ratingCache}
        setRatingCache={(uuid, result) => setRatingCache((cache) => ({
          ...cache,
          [uuid]: result,
        }))}
        {...props}
      />
    );
  }

  console.error(`Unhandled view type of Pokebox view: ${filter.viewType satisfies never}`);
};

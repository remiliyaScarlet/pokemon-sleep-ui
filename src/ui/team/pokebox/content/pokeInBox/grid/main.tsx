import React from 'react';

import {PokeboxContentPokeInBoxCell} from '@/ui/team/pokebox/content/pokeInBox/grid/cell';
import {PokeInBoxViewCommonProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeboxContentPokeInBoxGrid = ({
  filter,
  isIncluded,
  setEditingUuid,
  sortedPokemonInfo,
  ...props
}: PokeInBoxViewCommonProps) => {
  return (
    <>
      {sortedPokemonInfo.map(({source}) => {
        const uuid = source.extra.uuid;

        // Explicitly checking `false` because the data might not get into the filter data array for check,
        // therefore `isIncluded[pokeInBox.Pokémon]` will be undefined
        if (isIncluded[source.pokemon.id] === false) {
          return <React.Fragment key={uuid}/>;
        }

        return (
          <PokeboxContentPokeInBoxCell
            key={uuid}
            pokeInBox={source.extra}
            displayType={filter.displayType}
            onClick={() => setEditingUuid(uuid)}
            {...props}
          />
        );
      })}
    </>
  );
};

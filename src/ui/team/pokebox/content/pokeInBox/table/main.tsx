import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokeboxContentPokeInBoxRow} from '@/ui/team/pokebox/content/pokeInBox/table/row';
import {PokeInBoxViewCommonProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeboxContentPokeInBoxTable = ({
  filter,
  isIncluded,
  setEditingPokeInBox,
  sortedPokemonInfo,
  ...props
}: PokeInBoxViewCommonProps) => {
  return (
    <Flex direction="col" className="max-h-[70vh] gap-1 overflow-auto">
      {sortedPokemonInfo.map(({source}) => {
        const uuid = source.extra.uuid;

        // Explicitly checking `false` because the data might not get into the filter data array for check,
        // therefore `isIncluded[pokeInBox.Pokémon]` will be undefined
        if (isIncluded[source.pokemon.id] === false) {
          return <React.Fragment key={uuid}/>;
        }

        return (
          <PokeboxContentPokeInBoxRow
            key={uuid}
            pokeInBox={source.extra}
            displayType={filter.displayType}
            snorlaxFavorite={filter.snorlaxFavorite}
            onClick={() => setEditingPokeInBox(source.extra)}
            {...props}
          />
        );
      })}
    </Flex>
  );
};

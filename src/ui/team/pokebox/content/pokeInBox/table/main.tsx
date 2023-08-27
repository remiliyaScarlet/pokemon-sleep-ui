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

        if (!isIncluded[uuid]) {
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

import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';

import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {Collapsible} from '@/components/layout/collapsible/main';
import {CollapsibleState} from '@/components/layout/collapsible/type';
import {Flex} from '@/components/layout/flex/common';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {
  PokemonInputFilter,
  pokemonInputType,
  UsePokemonFilterCommonData,
} from '@/components/shared/pokemon/input/type';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = FilterWithUpdaterProps<PokemonInputFilter> & UsePokemonFilterCommonData & {
  collapsibleState: CollapsibleState,
  pokemonList: PokemonInfo[],
};

export const PokemonCollapsibleFilter = ({collapsibleState, ...props}: Props) => {
  return (
    <Collapsible state={collapsibleState} classNameForHeight="h-72" button={
      <Flex direction="row" center className="gap-0.5">
        <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
        <div className="h-6 w-6">
          <FunnelIcon/>
        </div>
      </Flex>
    }>
      <Flex className="gap-1">
        {pokemonInputType.map((type) => (
          <PokemonFilter
            key={type}
            type={type}
            filterKey={type}
            {...props}
          />
        ))}
      </Flex>
    </Collapsible>
  );
};

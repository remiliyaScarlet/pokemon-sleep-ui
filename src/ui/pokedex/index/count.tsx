import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {PokemonId} from '@/types/game/pokemon';


type Props = {
  data: SortedPokemonInfo<null, PokemonInfoWithSortingPayload<null>>[],
  inclusionMap: FilterInclusionMap<PokemonId>,
};

export const PokedexResultCount = ({data, inclusionMap}: Props) => {
  const selected = data.filter(({source}) => inclusionMap[source.pokemon.id]).length;
  const total = data.length;

  return (
    <Flex direction="row" className="justify-end gap-1">
      <div>{selected}</div>
      <div>/</div>
      <div>{total}</div>
      <div>({(selected / total * 100).toFixed(2)}%)</div>
    </Flex>
  );
};

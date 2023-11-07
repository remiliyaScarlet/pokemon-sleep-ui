import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {PokemonId} from '@/types/game/pokemon';


type Props = {
  data: SortedPokemonInfo<null, PokemonInfoWithSortingPayload<null>>[],
  inclusionMap: FilterInclusionMap<PokemonId>,
};

export const PokedexResultCount = ({data, inclusionMap}: Props) => {
  const selected = data.filter(({source}) => inclusionMap[source.pokemon.id]).length;
  const total = data.length;

  return <CompletionResultUI completed={selected} total={total} className="self-end"/>;
};

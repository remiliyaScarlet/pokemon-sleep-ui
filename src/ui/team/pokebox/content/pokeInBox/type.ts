import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {PokeInBox} from '@/types/game/pokebox';
import {PokedexMap} from '@/types/game/pokemon';
import {PokeboxPokeInBoxChangeableProps} from '@/ui/team/pokebox/content/type';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';


export type PokeInBoxViewCommonProps = PokeboxCommonProps & {
  filter: PokeboxViewerFilter,
  isIncluded: FilterInclusionMap<string>,
  setEditingPokeInBox: React.Dispatch<React.SetStateAction<PokeInBox | undefined>>,
  sortedPokemonInfo: SortedPokemonInfo<PokeInBox, PokemonInfoWithSortingPayload<PokeInBox>>[],
};

export type PokeInBoxViewOfTypeProps = PokeInBoxViewCommonProps;

export type PokeInBoxViewUnitProps = PokeboxCommonProps & PokeboxPokeInBoxChangeableProps & {
  pokeInBox: PokeInBox,
  pokedexMap: PokedexMap,
  onClick: () => void,
};

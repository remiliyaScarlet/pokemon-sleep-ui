import React from 'react';

import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {PokeInBox} from '@/types/game/pokebox';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating';
import {PokeInBoxChangeableProps} from '@/ui/team/pokebox/content/type';
import {PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';


export type PokeInBoxRefreshDependency = {
  filter: PokeboxViewerFilter,
  sortedPokeInBox: SortedPokemonInfo<PokeInBox, PokemonInfoWithSortingPayload<PokeInBox>>[],
};

export type PokeInBoxPopupProps = {
  showPokemon: (pokemon: PokemonInfo) => void,
  setRatingPopupControl: (setupData: RatingSetupData) => void,
};

export type PokeInBoxViewCommonProps = PokeboxCommonProps & PokeInBoxPopupProps & PokeInBoxRefreshDependency & {
  setEditingPokeInBox: React.Dispatch<React.SetStateAction<PokeInBoxEditorState | undefined>>,
};

export type PokeInBoxViewOfTypeProps = PokeInBoxViewCommonProps;

export type PokeInBoxViewUnitProps = PokeboxCommonProps & PokeInBoxPopupProps & PokeInBoxChangeableProps & {
  pokeInBox: PokeInBox,
  pokedexMap: PokedexMap,
  onClick: () => void,
};

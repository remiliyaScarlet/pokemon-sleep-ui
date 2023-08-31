'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {Pokebox} from '@/types/game/pokebox';
import {PokeboxContent} from '@/ui/team/pokebox/content/main';
import {PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {PokeboxPickerInput} from '@/ui/team/pokebox/filter/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  initialPokebox: Pokebox,
};

export const PokeboxLoadedClient = (props: Props) => {
  const {pokedexMap} = props;

  const [editingPokeInBox, setEditingPokeInBox] = React.useState<PokeInBoxEditorState>();

  const pokemonList = Object.values(pokedexMap).filter(isNotNullish);

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeboxPickerInput
        pokemonList={pokemonList}
        onClick={(pokemonId) => setEditingPokeInBox({action: 'create', pokemonId})}
        {...props}
      />
      <AdsUnit/>
      <PokeboxContent
        pokemonList={pokemonList}
        editingPokeInBox={editingPokeInBox}
        setEditingPokeInBox={setEditingPokeInBox}
        {...props}
      />
      <AdsUnit/>
    </Flex>
  );
};

'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {Pokebox} from '@/types/game/pokebox';
import {PokeboxContent} from '@/ui/team/pokebox/content/main';
import {PokeboxPickerInput} from '@/ui/team/pokebox/filter/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {generateNewPokeInBox} from '@/ui/team/pokebox/utils';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  initialPokebox: Pokebox,
};

export const PokeboxLoadedClient = ({initialPokebox, ...props}: Props) => {
  const {pokedexMap} = props;

  const [pokebox, setPokebox] = React.useState(initialPokebox);

  const pokemon = Object.values(pokedexMap).filter(isNotNullish);

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeboxPickerInput
        pokemon={pokemon}
        onClick={(id) => {
          const pokeInfo = pokedexMap[id];
          if (!pokeInfo) {
            return;
          }

          const newPokeInBox = generateNewPokeInBox(pokeInfo);
          setPokebox((original) => ({
            ...original,
            [newPokeInBox.uuid]: newPokeInBox,
          }));
        }}
      />
      <AdsUnit/>
      <PokeboxContent pokebox={pokebox} pokemon={pokemon} setPokebox={setPokebox} {...props}/>
      <AdsUnit/>
    </Flex>
  );
};

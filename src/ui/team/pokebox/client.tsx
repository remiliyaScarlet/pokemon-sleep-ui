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

export const PokeboxClient = ({initialPokebox, ...props}: Props) => {
  const {pokedexMap} = props;

  const pokemon = Object.values(pokedexMap).filter(isNotNullish);
  const [pokebox, setPokebox] = React.useState(initialPokebox);

  return (
    <Flex direction="col" className="gap-2">
      <PokeboxPickerInput
        pokemon={pokemon}
        onClick={(id) => {
          const pokeInfo = pokedexMap[id];
          if (!pokeInfo) {
            return;
          }

          setPokebox((original) => original.concat(generateNewPokeInBox(pokeInfo)));
        }}
      />
      <AdsUnit/>
      <PokeboxContent pokebox={pokebox} pokemon={pokemon} setPokebox={setPokebox} {...props}/>
      <AdsUnit/>
    </Flex>
  );
};

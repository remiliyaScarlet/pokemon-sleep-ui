import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeboxPokeInBoxInfo = ({pokemon}: PokeboxPokeInBoxCommonProps) => {
  const {sleepType, specialty} = pokemon;

  return (
    <Flex direction="col" className="gap-1.5">
      <PokemonSleepType sleepType={sleepType} dimension="h-6 w-6"/>
      <PokemonSpecialty specialty={specialty} dimension="h-6 w-6"/>
    </Flex>
  );
};

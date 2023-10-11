import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxGridSkills = ({pokemon, pokeInBox, subSkillMap}: PokeInBoxCommonProps) => {
  const {skill, specialty} = pokemon;
  const {nature, subSkill} = pokeInBox;

  return (
    <Flex direction="row" noFullWidth className="gap-1.5">
      <FlexLink noFullWidth href={`/info/mainskill/${skill}`} className={clsx(
        'items-center gap-1.5 p-1.5 text-sm',
        specialty === specialtyIdMap.skill && 'bg-blink',
      )}>
        <MainSkillIcon id={pokemon.skill} dimension="h-9 w-9"/>
      </FlexLink>
      <Flex noFullWidth className="gap-1.5">
        <PokemonNatureIndicator nature={nature} hideName/>
        <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
      </Flex>
    </Flex>
  );
};

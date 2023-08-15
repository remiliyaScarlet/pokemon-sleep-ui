import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeboxPokeInBoxSkills = ({pokemon, pokeInBox, subSkillMap}: PokeboxPokeInBoxCommonProps) => {
  const {skill} = pokemon;
  const {nature, subSkill} = pokeInBox;

  const t = useTranslations('Game');

  return (
    <Flex direction="row" center>
      <div className="whitespace-nowrap">
        {t(`MainSkill.Name.${skill}`)}
      </div>
      <Flex direction="row" noFullWidth center className="ml-auto gap-1.5">
        <PokemonNatureIndicator nature={nature}/>
        <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
      </Flex>
    </Flex>
  );
};

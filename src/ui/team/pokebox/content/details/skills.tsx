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
    <Flex direction="col" className="gap-1.5">
      <Flex direction="col" className="items-start whitespace-nowrap">
        {t(`MainSkill.Name.${skill}`)}
      </Flex>
      <Flex direction="row" className="gap-1.5">
        <PokemonNatureIndicator nature={nature}/>
        <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
      </Flex>
    </Flex>
  );
};

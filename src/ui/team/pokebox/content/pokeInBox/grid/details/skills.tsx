import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxGridSkills = ({pokemon, pokeInBox, subSkillMap}: PokeInBoxCommonProps) => {
  const {skill, specialty} = pokemon;
  const {nature, subSkill} = pokeInBox;

  const t = useTranslations('Game');

  return (
    <Flex direction="col" className="gap-1.5">
      <Flex direction="col" noFullWidth className="w-fit">
        <Link href={`/info/mainskill/${skill}`} className={clsx(
          'button-clickable whitespace-nowrap p-1.5 text-start text-sm',
          specialty === specialtyIdMap.skill && 'bg-blink',
        )}>
          {t(`MainSkill.Name.${skill}`)}
        </Link>
      </Flex>
      <Flex direction="row" className="gap-1.5">
        <PokemonNatureIndicator nature={nature} hideName/>
        <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
      </Flex>
    </Flex>
  );
};

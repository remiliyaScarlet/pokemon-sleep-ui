import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxTableSkills = ({
  pokeInBox,
  pokemon,
  subSkillMap,
}: PokeInBoxTableDetailsProps) => {
  const {
    level,
    nature,
    subSkill,
  } = pokeInBox;

  const t = useTranslations('Game');

  return (
    <>
      <Flex direction="row" center noFullWidth className="w-56">
        <PokemonNatureIndicator nature={nature}/>
      </Flex>
      <Flex direction="row" center noFullWidth className="w-36">
        <PokemonSubSkillIndicator level={level} subSkill={subSkill} subSkillMap={subSkillMap}/>
      </Flex>
      <FlexLink direction="row" center href={`/info/mainskill/${pokemon.skill}`} className={clsx(
        'w-60 gap-1 whitespace-nowrap p-1 text-sm',
        pokemon.specialty === specialtyIdMap.skill && 'info-highlight',
      )}>
        <MainSkillIcon id={pokemon.skill} dimension="h-6 w-6"/>
        <div>{t(`MainSkill.Name.${pokemon.skill}`)}</div>
      </FlexLink>
    </>
  );
};

import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonSubSkillIcon} from '@/components/shared/pokemon/subSkill/icon';
import {PokemonSubSkillUiProps} from '@/components/shared/pokemon/subSkill/type';


export const PokemonSubSkillText = (props: PokemonSubSkillUiProps) => {
  const {subSkill} = props;

  const t = useTranslations('Game');

  return (
    <Flex noFullWidth direction="row" className="items-center gap-1">
      <PokemonSubSkillIcon {...props}/>
      {subSkill && <div>{t(`SubSkill.Name.${subSkill.id}`)}</div>}
    </Flex>
  );
};

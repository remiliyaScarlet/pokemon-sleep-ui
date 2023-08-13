import React from 'react';

import {subSkillRarityDisabled, subSkillRarityIconBg} from '@/styles/classes';
import {SubSkillData} from '@/types/game/pokemon/subskill';
import {classNames} from '@/utils/react';


type Props = {
  subSkill: SubSkillData | undefined,
};

export const PokemonSubSkillIcon = ({subSkill}: Props) => {
  return (
    <div className={classNames(
      'rounded-full text-sm h-4 w-4',
      subSkill && subSkill.rarity ? subSkillRarityIconBg[subSkill.rarity] : subSkillRarityDisabled,
    )}/>
  );
};

import React from 'react';

import {clsx} from 'clsx';

import {subSkillRarityDisabled, subSkillRarityIconBg} from '@/styles/classes';
import {SubSkillData} from '@/types/game/pokemon/subskill';


type Props = {
  subSkill: SubSkillData | undefined,
};

export const PokemonSubSkillIcon = ({subSkill}: Props) => {
  return (
    <div className={clsx(
      'h-4 w-4 rounded-full text-sm',
      subSkill && subSkill.rarity ? subSkillRarityIconBg[subSkill.rarity] : subSkillRarityDisabled,
    )}/>
  );
};

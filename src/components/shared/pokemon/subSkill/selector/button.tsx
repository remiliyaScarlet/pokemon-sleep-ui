import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FlexButton} from '@/components/layout/flex/button';
import {PokemonSubSkillIcon} from '@/components/shared/pokemon/subSkill/icon';
import {subSkillRaritySectionBg} from '@/styles/game/subSkill';
import {SubSkillData} from '@/types/game/pokemon/subSkill';


type Props = {
  data: SubSkillData,
  selectable: boolean,
  onClick: () => void,
};

export const PokemonSubSkillSelectionButton = ({data, selectable, onClick}: Props) => {
  const {id} = data;

  const t = useTranslations('Game.SubSkill.Name');

  return (
    <FlexButton noFullWidth={false} onClick={onClick} disabled={!data.rarity || !selectable} className={clsx(
      'enabled:button-clickable disabled:button-disabled items-center gap-1 self-stretch rounded-lg p-1.5',
      data.rarity ? subSkillRaritySectionBg[data.rarity] : 'text-slate-500',
    )}>
      <PokemonSubSkillIcon subSkill={data}/>
      <div className="text-start">{t(id.toString())}</div>
    </FlexButton>
  );
};

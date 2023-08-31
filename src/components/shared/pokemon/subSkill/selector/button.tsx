import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonSubSkillIcon} from '@/components/shared/pokemon/subSkill/icon';
import {subSkillRaritySectionBg} from '@/styles/classes';
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
    <button onClick={onClick} disabled={!data.rarity || !selectable} className={clsx(
      'enabled:button-clickable disabled:button-disabled rounded-lg p-1.5',
      'width-with-gap xs:width-with-gap-2-items sm:width-with-gap-3-items',
      data.rarity ? subSkillRaritySectionBg[data.rarity] : 'text-slate-500',
    )}>
      <Flex direction="row" center className="gap-1">
        <PokemonSubSkillIcon subSkill={data}/>
        <div>{t(id.toString())}</div>
      </Flex>
    </button>
  );
};

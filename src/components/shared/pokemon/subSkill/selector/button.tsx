import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {subSkillRaritySectionBg} from '@/styles/classes';
import {SubSkillData} from '@/types/game/pokemon/subskill';


type Props = {
  data: SubSkillData,
  onClick: () => void,
};

export const PokemonSubSkillSelectionButton = ({data, onClick}: Props) => {
  const {id} = data;

  const t = useTranslations('Game.SubSkill.Name');

  return (
    <button onClick={onClick} disabled={!data.rarity} className={clsx(
      'enabled:button-clickable rounded-lg p-1.5',
      'width-with-gap xs:width-with-gap-2-items sm:width-with-gap-3-items',
      data.rarity ? subSkillRaritySectionBg[data.rarity] : 'text-slate-500',
    )}>
      <Flex direction="col" center>
        {t(id.toString())}
      </Flex>
    </button>
  );
};

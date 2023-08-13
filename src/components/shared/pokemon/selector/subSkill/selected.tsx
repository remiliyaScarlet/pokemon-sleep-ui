import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {subSkillRarityDisabled, subSkillRaritySectionBg} from '@/styles/classes';
import {SubSkillData} from '@/types/game/pokemon/subskill';


type Props = {
  level: number,
  selected: SubSkillData | undefined,
  onClick: () => void,
};

export const PokemonSubSkillSelected = ({level, selected, onClick}: Props) => {
  const t = useTranslations('Game.SubSkill.Name');

  return (
    <button onClick={onClick} disabled={!selected || !selected?.rarity} className={clsx(
      'enabled:button-clickable rounded-lg p-1.5',
      'width-with-gap width-with-gap-2-items md:width-with-gap-5-items',
      selected?.rarity ? subSkillRaritySectionBg[selected.rarity] : subSkillRarityDisabled,
    )}>
      <Flex direction="row" className="md:flex-col">
        <div className="text-sm">
          {level}
        </div>
        <Flex direction="col" center className="text-sm">
          {selected ? t(selected.id.toString()) : '-'}
        </Flex>
      </Flex>
    </button>
  );
};

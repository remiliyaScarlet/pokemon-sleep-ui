import React from 'react';

import ArrowUpCircleIcon from '@heroicons/react/24/outline/ArrowUpCircleIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {subSkillRarityDisabled, subSkillRaritySectionBg} from '@/styles/classes';
import {SubSkillData} from '@/types/game/pokemon/subskill';


type Props = {
  data: SubSkillData,
};

export const SubSkillInfoSingle = ({data}: Props) => {
  const {id, next, rarity, bonus} = data;

  const t = useTranslations('Game.SubSkill');

  const bonusValue = Object.values(bonus).at(0) ?? '(?)';

  return (
    <Flex direction="col" center className={clsx(
      'gap-1 rounded-lg p-2',
      'width-with-gap md:width-with-gap-2-items lg:width-with-gap-3-items xl:width-with-gap-4-items',
      rarity ? subSkillRaritySectionBg[rarity] : subSkillRarityDisabled,
    )}>
      <Flex direction="row" className="items-end justify-center gap-1 text-lg">
        <div className="text-sm text-slate-600 dark:text-slate-400">#{id}</div>
        <div>{t(`Name.${id}`)}</div>
      </Flex>
      <div className="text-sm text-slate-600 dark:text-slate-400">
        {t(`Description.${id}`, {bonus: bonusValue})}
      </div>
      <Flex direction="row">
        <Flex direction="row" center className="gap-1.5">
          <div className="h-5 w-5">
            <ArrowUpCircleIcon/>
          </div>
          <div className={clsx('text-sm', next ? 'text-green-700 dark:text-green-400' : 'text-slate-500')}>
            {next ?
              t(`Name.${next}`) :
              <div className="h-5 w-5"><XMarkIcon/></div>
            }
          </div>
        </Flex>
        <Flex direction="row" center className="gap-1.5">
          <div className="h-5 w-5">
            <ChevronUpIcon/>
          </div>
          <div>
            {bonusValue}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

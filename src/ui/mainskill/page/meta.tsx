import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {MainSkillEffectTypeIcon} from '@/components/shared/pokemon/mainSkill/typeIcon';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';
import {toUnique} from '@/utils/array';


type Props = {
  data: MainSkillData,
};

export const MainSkillMeta = ({data}: Props) => {
  const {id, effects} = data;

  const t = useTranslations('Game');
  const uniqueEffects = toUnique(effects.map(({type}) => type));

  return (
    <Flex direction="col" center className="gap-2 p-1.5">
      <div className="text-3xl">
        {t(`MainSkill.Name.${id}`)}
      </div>
      <div className={clsx(
        'text-slate-600 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-600',
      )}>
        {t(`MainSkill.Description.${id}`)}
      </div>
      <Flex direction="row" center className="gap-2">
        {uniqueEffects.map((effect) => (
          <MainSkillEffectTypeIcon key={effect} type={effect} dimension="h-10 w-10"/>
        ))}
      </Flex>
    </Flex>
  );
};

import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';


type Props = {
  data: MainSkillData,
};

export const MainSkillMeta = ({data}: Props) => {
  const {id} = data;

  const t = useTranslations('Game');

  return (
    <Flex direction="col" center className="gap-2 p-1.5">
      <div className="text-2xl">
        {t(`MainSkill.Name.${id}`)}
      </div>
      <div className={clsx(
        'text-sm text-slate-600 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-600',
      )}>
        {t(`MainSkill.Description.${id}`)}
      </div>
    </Flex>
  );
};

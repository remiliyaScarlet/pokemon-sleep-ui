import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {MainSkillEffectTypeIcon} from '@/components/shared/pokemon/mainSkill/icon/type';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';


type Props = {
  data: MainSkillData,
};

export const MainSkillLink = ({data}: Props) => {
  const {id, effects} = data;

  const t = useTranslations('Game');

  return (
    <Link href={`/info/mainskill/${id}`} className="button-clickable-bg group p-4">
      <Flex center className="gap-1">
        <Flex direction="row" center className="gap-1 text-xl">
          <MainSkillEffectTypeIcon type={effects[0].type} dimension="h-7 w-7"/>
          <div>
            {t(`MainSkill.Name.${id}`)}
          </div>
        </Flex>
        <HorizontalSplitter className="w-full"/>
        <Flex className={clsx(
          'text-sm text-slate-600 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-600',
        )}>
          {t(`MainSkill.Description.${id}`)}
        </Flex>
      </Flex>
    </Link>
  );
};

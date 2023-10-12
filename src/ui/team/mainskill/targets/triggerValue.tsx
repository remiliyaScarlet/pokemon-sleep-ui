import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MainSkillTriggerValueIcon} from '@/components/shared/pokemon/mainSkill/icon/trigger';
import {getNumberStyles} from '@/styles/text/number';
import {SkillTriggerAnalysisCalculatedUnit} from '@/ui/team/mainskill/targets/type';
import {formatFloat, formatFloat3} from '@/utils/number';


type Props = {
  unit: SkillTriggerAnalysisCalculatedUnit,
};

export const SkillTriggerAnalysisTriggerValue = ({unit}: Props) => {
  const {skillTriggerValue} = unit;
  const {actual, ratioToBase} = skillTriggerValue;

  const t = useTranslations('UI.InPage.Pokedex');

  const styleClass = getNumberStyles({num: ratioToBase, base: 1});

  return (
    <Flex noFullWidth center>
      <Flex noFullWidth className={clsx('text-2xl', styleClass)}>
        {formatFloat3(ratioToBase)}x
      </Flex>
      <Flex direction="row" noFullWidth className="gap-1">
        <MainSkillTriggerValueIcon alt={t('Stats.MainSkillTriggerValue')}/>
        <div>{formatFloat(actual)}</div>
      </Flex>
    </Flex>
  );
};

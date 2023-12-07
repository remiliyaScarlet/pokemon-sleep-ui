import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {getProbabilityOfNoSkill, GetProbabilityOfNoSkillOpts} from '@/utils/game/producing/probability';
import {formatFloat} from '@/utils/number/format';


export const PokemonProbabilityOfNoSkill = (opts: GetProbabilityOfNoSkillOpts) => {
  const t = useTranslations('UI.Producing.Probability');
  const probability = React.useMemo(() => getProbabilityOfNoSkill(opts), [opts]);

  return (
    <Flex noFullWidth direction="row" className="items-center gap-1 text-sm">
      <GenericIcon src="/images/generic/mainSkillSlash.png" alt={t('NoSkillAfterWakeup')} dimension="h-4 w-4"/>
      <div>{probability ? formatFloat(probability * 100) : '-'}%</div>
    </Flex>
  );
};

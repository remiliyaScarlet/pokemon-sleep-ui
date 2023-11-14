import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {formatFloat3} from '@/utils/number/format';


type Props = {
  ratePercent: number,
};

export const PokemonMainSkillTriggerRate = ({ratePercent}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Stats');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <GenericMainSkillIcon alt={t('MainSkillTriggerRate')}/>
      <div>{formatFloat3(ratePercent)}%</div>
    </Flex>
  );
};

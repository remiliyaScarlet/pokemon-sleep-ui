import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {Dimension} from '@/types/style';
import {formatFloat3} from '@/utils/number/format';


type Props = {
  ratePercent: number | null,
  dimension?: Dimension,
};

export const PokemonMainSkillTriggerRate = ({ratePercent, dimension}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Stats');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <GenericMainSkillIcon alt={t('MainSkillTriggerRate')} dimension={dimension}/>
      <div>{formatFloat3(ratePercent)}%</div>
    </Flex>
  );
};

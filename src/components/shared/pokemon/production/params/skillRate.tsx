import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {PokemonProducingParamsCommonProps} from '@/components/shared/pokemon/production/params/type';
import {formatFloat, formatFloat3} from '@/utils/number/format';


export const PokemonMainSkillTriggerRate = ({params, noIcon, dimension}: PokemonProducingParamsCommonProps) => {
  const {skillPercent} = params;

  const t = useTranslations('UI.InPage.Pokedex.Stats');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      {!noIcon && <GenericMainSkillIcon alt={t('MainSkillTriggerRate')} dimension={dimension}/>}
      <span>
        {formatFloat3(skillPercent)}%
        {
          skillPercent &&
          <>&nbsp;(<span className="text-xs">1:</span>{formatFloat(1 / (skillPercent / 100))})</>
        }
      </span>
    </Flex>
  );
};

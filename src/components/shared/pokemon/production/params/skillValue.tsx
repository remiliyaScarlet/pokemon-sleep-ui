import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {PokemonProducingParamsCommonProps} from '@/components/shared/pokemon/production/params/type';
import {getProducingParamsSectionStyle} from '@/components/shared/pokemon/production/params/utils';
import {formatFloat3} from '@/utils/number/format';


export const PokemonMainSkillValue = ({params, noIcon, dimension}: PokemonProducingParamsCommonProps) => {
  const {skillValue} = params;

  const t = useTranslations('UI.InPage.Pokedex.Stats');

  return (
    <Flex direction="row" noFullWidth className={getProducingParamsSectionStyle(params)}>
      {!noIcon && <GenericMainSkillIcon alt={t('MainSkillValue')} dimension={dimension}/>}
      <div>{formatFloat3(skillValue)}</div>
    </Flex>
  );
};

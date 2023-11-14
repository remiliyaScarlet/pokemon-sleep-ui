import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {Dimension} from '@/types/style';
import {formatFloat3} from '@/utils/number/format';


type Props = {
  value: number,
  dimension?: Dimension,
};

export const PokemonMainSkillValue = ({value, dimension}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Stats');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <GenericMainSkillIcon alt={t('MainSkillValue')} dimension={dimension}/>
      <div>{formatFloat3(value)}</div>
    </Flex>
  );
};

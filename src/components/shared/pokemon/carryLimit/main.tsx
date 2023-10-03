import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonPackStatsCommonProps} from '@/components/shared/pokemon/type';
import {getPackStatsStyle} from '@/components/shared/pokemon/utils';
import {formatInt} from '@/utils/number';


type Props = PokemonPackStatsCommonProps & {
  carryLimit: number,
};

export const PokemonCarryLimit = ({carryLimit, ...props}: Props) => {
  const {normalText} = props;
  const t = useTranslations('UI.Common');

  return (
    <Flex direction="row" noFullWidth className={getPackStatsStyle(props)}>
      <PokemonDataIcon
        src="/images/generic/bag.png"
        alt={t('MaxCarry')}
        dimension={normalText ? 'h-6 w-6' : 'h-4 w-4'}
        invert
      />
      <div>{formatInt(carryLimit)}</div>
    </Flex>
  );
};

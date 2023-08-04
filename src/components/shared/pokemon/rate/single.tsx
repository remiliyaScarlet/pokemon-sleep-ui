import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/rate/type';
import {imageIconSizes} from '@/styles/image';
import {formatFloat} from '@/utils/number';


type Props = PokemonProducingRateProps & {
  dailyRate: number | undefined,
  icon?: React.ReactNode,
};

export const PokemonProducingRateSingle = ({icon, dailyRate, simplified}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');
  const t2 = useTranslations('UI.Common');

  return (
    <Flex direction="row" className="ml-auto items-center justify-end gap-1 text-sm">
      <div className="relative h-4 w-4">
        {icon ?? <NextImage src="/images/generic/energy.png" alt={t('Stats.Energy.Name')} sizes={imageIconSizes}/>}
      </div>
      {!simplified && <div>{t('Stats.Energy.Daily')}</div>}
      <div>{dailyRate ? formatFloat(dailyRate) : '-'}</div>
      {!simplified &&
        <>
          <div>/</div>
          <div>{t('Stats.Energy.Weekly')}</div>
          <div>{dailyRate ? formatFloat(dailyRate * 7) : '-'}</div>
        </>}
      {simplified &&
        <>
          <div>/</div>
          <div>{t2('Day')}</div>
        </>}
    </Flex>
  );
};

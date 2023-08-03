import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {formatFloat} from '@/utils/number';


type Props = {
  dailyRate: number,
  icon?: React.ReactNode,
};

export const PokemonProductionRate = ({icon, dailyRate}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="row" className="ml-auto items-center justify-end gap-1 text-sm">
      <div className="relative h-4 w-4">
        {icon ?? <NextImage src="/images/generic/energy.png" alt={t('Stats.Energy.Name')} sizes={imageIconSizes}/>}
      </div>
      <div>{t('Stats.Energy.Daily')}</div>
      <div>{formatFloat(dailyRate)}</div>
      <div>/</div>
      <div>{t('Stats.Energy.Weekly')}</div>
      <div>{formatFloat(dailyRate * 7)}</div>
    </Flex>
  );
};

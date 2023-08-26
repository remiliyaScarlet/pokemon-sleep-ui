import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/production/type';
import {formatFloat} from '@/utils/number';


type Props = PokemonProducingRateProps & {
  dailyRate: number | undefined,
  icon?: React.ReactNode,
};

export const PokemonProducingRateContent = ({icon, dailyRate, simplified}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');
  const t2 = useTranslations('UI.Common');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-0.5 text-sm">
      {icon ?
        <div className="relative h-4 w-4">{icon}</div> :
        <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Stats.Energy.Name')}/>}
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

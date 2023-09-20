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

export const PokemonProducingRateContent = ({icon, dailyRate}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-0.5 text-sm">
      {icon ?
        <div className="relative h-4 w-4">{icon}</div> :
        <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Stats.Energy.Name')}/>}
      <div>{dailyRate ? formatFloat(dailyRate) : '-'}</div>
    </Flex>
  );
};

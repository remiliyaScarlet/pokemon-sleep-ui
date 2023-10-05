import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/production/type';
import {formatFloat} from '@/utils/number';


type Props = PokemonProducingRateProps & {
  dailyRate: number | undefined,
  isEnergy?: boolean,
  icon?: React.ReactNode,
  normalSize?: boolean,
};

export const PokemonProducingRateContent = ({dailyRate, isEnergy, icon, normalSize}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');
  const dimension = normalSize ? 'h-5 w-5' : 'h-4 w-4';

  return (
    <Flex direction="row" noFullWidth className={clsx('items-center gap-0.5', !normalSize && 'text-sm')}>
      {icon ?
        <div className={clsx('relative', dimension)}>{icon}</div> :
        <ColoredEnergyIcon dimension={dimension} alt={t('Stats.Energy.Name')}/>}
      <div className={clsx(isEnergy && 'text-energy')}>
        {dailyRate ? formatFloat(dailyRate) : '-'}
      </div>
    </Flex>
  );
};

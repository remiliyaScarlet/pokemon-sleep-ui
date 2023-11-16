import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonBerryStats} from '@/components/shared/pokemon/icon/itemStats/berry';
import {useCalculatedUserSettings} from '@/hooks/userData/settings/calculated';
import {BerryPageDataProps} from '@/ui/berry/page/type';


type Props = BerryPageDataProps & {
  level: number,
};

export const BerryProducingRatesOfPokemon = ({level, preloadedSettings, ...props}: Props) => {
  const {data} = useSession();
  const {calculatedSettings} = useCalculatedUserSettings({
    server: preloadedSettings,
    client: data?.user.preloaded.settings,
  });

  return (
    <PokemonBerryStats
      level={level}
      {...calculatedSettings}
      {...props}
    />
  );
};

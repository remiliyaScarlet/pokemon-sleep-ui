import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIconsBerryStats} from '@/components/shared/pokemon/icon/itemStats/berry';
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
    <Flex direction="row" wrap className="info-section">
      <PokemonIconsBerryStats
        level={level}
        {...calculatedSettings}
        {...props}
      />
    </Flex>
  );
};

import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex';
import {PokemonIconsBerryStats} from '@/components/shared/pokemon/icon/berryStats';
import {useUserSettings} from '@/hooks/userData/settings';
import {BerryPageCommonProps} from '@/ui/berry/page/type';


type Props = BerryPageCommonProps & {
  level: number,
};

export const BerryProducingRatesOfPokemon = ({level, preloadedSettings, ...props}: Props) => {
  const {data} = useSession();
  const {bonus} = useUserSettings({
    server: preloadedSettings,
    client: data?.user.preloaded.settings,
  });

  return (
    <Flex direction="row" wrap className="info-section">
      <PokemonIconsBerryStats level={level} bonus={bonus} {...props}/>
    </Flex>
  );
};

import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonBerryStats} from '@/components/shared/pokemon/icon/itemStats/berry';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {BerryPageDataProps} from '@/ui/berry/page/type';


type Props = BerryPageDataProps & {
  level: number,
};

export const BerryProducingRatesOfPokemon = ({mealMap, preloaded, level, ...props}: Props) => {
  const {data} = useSession();
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    mealMap,
  });

  return (
    <PokemonBerryStats
      level={level}
      translatedSettings={translatedSettings}
      {...props}
    />
  );
};

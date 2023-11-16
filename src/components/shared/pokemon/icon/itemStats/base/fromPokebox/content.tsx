import React from 'react';

import {useSession} from 'next-auth/react';

import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {PokemonItemStatsFromPokeboxList} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/list';
import {
  PokemonItemStatsFromPokeboxCommonProps,
} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/type';
import {PremiumOnly} from '@/components/static/premiumOnly';


type Props = PokemonItemStatsFromPokeboxCommonProps & {
  session: ReturnType<typeof useSession>,
};

export const PokemonItemStatsFromPokeboxContent = ({session, ...props}: Props) => {
  if (session.status === 'loading') {
    return <Loading text="Session"/>;
  }

  if (!session.data?.user.activation?.premium) {
    return (
      <Flex center className="info-highlight p-3">
        <PremiumOnly className="[&_a]:text-link"/>
      </Flex>
    );
  }

  return <PokemonItemStatsFromPokeboxList {...props}/>;
};

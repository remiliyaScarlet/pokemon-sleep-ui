import React from 'react';

import {PokemonIconsItemStatsBase} from '@/components/shared/pokemon/icon/itemStats/base/main';
import {PokemonIconsItemStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/base/type';
import {usePokemonProducingStats} from '@/components/shared/pokemon/icon/itemStats/worker/hook';
import {PokemonItemStatsWorkerOpts} from '@/components/shared/pokemon/icon/itemStats/worker/type';


type Props = PokemonItemStatsWorkerOpts & PokemonIconsItemStatsCommonProps;

export const PokemonIconsItemStatsFromPokebox = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const producingStats = usePokemonProducingStats({
    setLoading,
    ...props,
  });

  return (
    <PokemonIconsItemStatsBase
      loading={loading}
      producingStats={producingStats}
      {...props}
    />
  );
};

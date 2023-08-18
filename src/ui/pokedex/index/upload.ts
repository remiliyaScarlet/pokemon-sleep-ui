import React from 'react';

import {useUserDataActor} from '@/hooks/userData';
import {PokedexFilter} from '@/ui/pokedex/index/type';


type Props = {
  filter: PokedexFilter,
};

export const usePokedexAutoUpload = ({filter}: Props) => {
  const {act, status} = useUserDataActor();

  React.useEffect(() => {
    if (!act || status === 'processing') {
      return;
    }

    const timeoutId = setTimeout(() => (
      act({
        action: 'upload',
        options: {type: 'pokedex', data: {sort: filter.sort, display: filter.display}},
      })
    ), 500);

    return () => clearTimeout(timeoutId);
  }, [filter.sort, filter.display]);
};

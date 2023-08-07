import React from 'react';

import {useUploadUserData} from '@/hooks/userData';
import {PokedexFilter} from '@/ui/pokedex/index/type';


type Props = {
  filter: PokedexFilter,
};

export const usePokedexAutoUpload = ({filter}: Props) => {
  const {upload, status} = useUploadUserData();

  React.useEffect(() => {
    if (!upload || status === 'updating') {
      return;
    }

    const timeoutId = setTimeout(() => (
      upload({type: 'pokedex', data: {sort: filter.sort, display: filter.display}})
    ), 500);

    return () => clearTimeout(timeoutId);
  }, [filter.sort, filter.display]);
};

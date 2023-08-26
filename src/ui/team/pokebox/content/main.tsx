import React from 'react';

import {FilterInputProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {Pokebox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeboxPokeInBoxView} from '@/ui/team/pokebox/content/pokeInBox/main';
import {PokeInBoxViewCommonProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerInput} from '@/ui/team/pokebox/viewer/main';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';


type Props = FilterInputProps<PokeboxViewerFilter> & PokeboxCommonProps & PokeInBoxViewCommonProps & {
  pokebox: Pokebox,
  pokemon: PokemonInfo[],
  loading: boolean,
  setPokebox: React.Dispatch<React.SetStateAction<Pokebox>>,
};

export const PokeboxContent = (props: Props) => {
  const {pokebox, loading, filter} = props;

  useAutoUpload({
    opts: {
      type: 'pokebox',
      data: {pokebox, display: {sort: filter.sort, displayType: filter.displayType, viewType: filter.viewType}},
    },
    triggerDeps: [pokebox, filter.sort, filter.displayType, filter.viewType],
    delay: 0,
  });

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeboxViewerInput {...props}/>
      <LazyLoad loading={loading} className="gap-1.5">
        <PokeboxPokeInBoxView {...props}/>
      </LazyLoad>
    </Flex>
  );
};

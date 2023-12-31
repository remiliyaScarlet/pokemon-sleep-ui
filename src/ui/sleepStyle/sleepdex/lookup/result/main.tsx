import React from 'react';

import {Grid} from '@/components/layout/grid';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {SleepdexLookupDataEntry} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {SleepdexLookupResultCell} from '@/ui/sleepStyle/sleepdex/lookup/result/cell';
import {SleepdexLookupResultCommonProps} from '@/ui/sleepStyle/sleepdex/lookup/result/type';


type Props = SleepdexLookupResultCommonProps & {
  dataToShow: SleepdexLookupDataEntry[],
  loading: boolean,
};

export const SleepdexLookupResult = ({dataToShow, loading, ...props}: Props) => {
  const {showPokemon, ...pokemonLinkPopup} = usePokemonLinkPopup();

  return (
    <>
      <PokemonLinkPopup {...pokemonLinkPopup}/>
      <LazyLoad loading={loading}>
        <Grid className="grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {dataToShow.map((data) => (
            <SleepdexLookupResultCell
              key={data.sleepdexStyleId}
              data={data}
              onClick={() => showPokemon(data.pokemon)}
              {...props}
            />
          ))}
        </Grid>
      </LazyLoad>
    </>
  );
};

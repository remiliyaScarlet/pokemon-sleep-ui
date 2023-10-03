'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {BerryFavoriteInfoUi} from '@/ui/berry/page/favoriteInfo';
import {BerryMeta} from '@/ui/berry/page/meta';
import {BerryProducingRatesOfPokemon} from '@/ui/berry/page/pokemon';
import {BerryPageDataProps} from '@/ui/berry/page/type';


type Props = BerryPageDataProps;

export const BerryPageClient = (props: Props) => {
  const [level, setLevel] = React.useState(1);

  return (
    <Flex direction="col" className="gap-1.5">
      <Flex direction="col" className="gap-1.5 lg:flex-row">
        <BerryMeta {...props}/>
        <AdsUnit className="lg:hidden"/>
        <BerryFavoriteInfoUi level={level} setLevel={setLevel} {...props}/>
      </Flex>
      <AdsUnit/>
      <BerryProducingRatesOfPokemon level={level} {...props}/>
      <AdsUnit/>
    </Flex>
  );
};

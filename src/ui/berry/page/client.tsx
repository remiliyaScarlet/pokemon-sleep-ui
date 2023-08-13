'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {BerryFavoriteInfoUi} from '@/ui/berry/page/favoriteInfo';
import {BerryMeta} from '@/ui/berry/page/meta';
import {BerryProducingRatesOfPokemon} from '@/ui/berry/page/pokemon';
import {BerryPageCommonProps} from '@/ui/berry/page/type';


type Props = BerryPageCommonProps;

export const BerryPageClient = (props: Props) => {
  const [level, setLevel] = React.useState(1);

  return (
    <Flex direction="col" className="gap-1.5">
      <Flex direction="col" className="gap-1.5 md:flex-row">
        <BerryMeta {...props}/>
        <BerryFavoriteInfoUi level={level} setLevel={setLevel} {...props}/>
      </Flex>
      <BerryProducingRatesOfPokemon level={level} {...props}/>
    </Flex>
  );
};

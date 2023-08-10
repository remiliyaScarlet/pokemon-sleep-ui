'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {useMapFilter} from '@/ui/map/page/hook';
import {MapInfoInput} from '@/ui/map/page/input/main';
import {MapCommonProps} from '@/ui/map/page/type';
import {MapUnlockTable} from '@/ui/map/page/unlockTable/main';


export const MapInfo = (props: MapCommonProps) => {
  const {filter, setFilter, isIncluded} = useMapFilter(props);

  return (
    <>
      <MapInfoInput filter={filter} setFilter={setFilter} {...props}/>
      <AdsUnit/>
      <MapUnlockTable filter={filter} isIncluded={isIncluded} {...props}/>
    </>
  );
};

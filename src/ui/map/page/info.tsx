'use client';
import React from 'react';

import {useMapFilter} from '@/ui/map/page/hook';
import {MapInfoInput} from '@/ui/map/page/input/main';
import {MapCommonProps} from '@/ui/map/page/type';
import {MapUnlockTable} from '@/ui/map/page/unlockTable';


export const MapInfo = (props: MapCommonProps) => {
  const {filter, setFilter, isIncluded} = useMapFilter(props);

  return (
    <>
      <MapInfoInput filter={filter} setFilter={setFilter} {...props}/>
      <MapUnlockTable filter={filter} isIncluded={isIncluded} {...props}/>
    </>
  );
};

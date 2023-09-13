import React from 'react';

import {MapUnlockTableDataRow} from '@/ui/map/page/unlockTable/rowData';
import {MapUnlockTableStatsRow} from '@/ui/map/page/unlockTable/rowStats';
import {MapUnlockTableRowProps} from '@/ui/map/page/unlockTable/type';


export const MapUnlockTableRow = (props: MapUnlockTableRowProps) => {
  return (
    <>
      <MapUnlockTableDataRow {...props}/>
      <MapUnlockTableStatsRow {...props}/>
    </>
  );
};

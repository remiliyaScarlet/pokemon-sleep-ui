import React from 'react';

import {Flex} from '@/components/layout/flex';
import {MapUnlockTablePokemonIcons} from '@/ui/map/page/unlockTable/pokemonIcons';
import {MapUnlockTableRankMeta} from '@/ui/map/page/unlockTable/rankMeta';
import {MapUnlockTableSleepdexStats} from '@/ui/map/page/unlockTable/sleepdexStats';
import {MapUnlockTableRowProps} from '@/ui/map/page/unlockTable/type';


export const MapUnlockTableRow = (props: MapUnlockTableRowProps) => {
  const {isLoggedIn} = props;

  return (
    <Flex direction="col" className="unlock-table-row gap-2 xl:flex-row">
      <MapUnlockTableRankMeta {...props}/>
      <Flex direction="col">
        <MapUnlockTablePokemonIcons {...props}/>
        {isLoggedIn && <MapUnlockTableSleepdexStats {...props}/>}
      </Flex>
    </Flex>
  );
};

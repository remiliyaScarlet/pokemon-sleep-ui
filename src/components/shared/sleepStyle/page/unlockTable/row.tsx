import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {MapUnlockTablePokemonIcons} from '@/components/shared/sleepStyle/page/unlockTable/pokemonIcons';
import {MapUnlockTableRankMeta} from '@/components/shared/sleepStyle/page/unlockTable/rankMeta';
import {MapUnlockTableSleepdexStats} from '@/components/shared/sleepStyle/page/unlockTable/sleepdexStats';
import {MapUnlockTableRowProps} from '@/components/shared/sleepStyle/page/unlockTable/type';


export const MapUnlockTableRow = (props: MapUnlockTableRowProps) => {
  const {isLoggedIn} = props;

  return (
    <Flex className="unlock-table-row gap-1 p-1 xl:flex-row">
      <MapUnlockTableRankMeta {...props}/>
      <Flex>
        <MapUnlockTablePokemonIcons {...props}/>
        {isLoggedIn && <MapUnlockTableSleepdexStats {...props}/>}
      </Flex>
    </Flex>
  );
};

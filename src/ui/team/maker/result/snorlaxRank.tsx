import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {MapLink} from '@/components/shared/map/link';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {SnorlaxRankFinalEstimate} from '@/types/game/rank';


type Props = {
  finalEstimates: SnorlaxRankFinalEstimate[],
};

export const TeamMakerSnorlaxRankFinalEstimate = ({finalEstimates}: Props) => {
  return (
    <Flex direction="row" wrap className="justify-end gap-1">
      {finalEstimates.map(({mapId, rank}) => {
        if (!rank) {
          return null;
        }

        return (
          <MapLink key={mapId} mapId={mapId} className="h-10 w-20">
            <SnorlaxRankUI rank={rank.rank} hideText/>
          </MapLink>
        );
      })}
    </Flex>
  );
};

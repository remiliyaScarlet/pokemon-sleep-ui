import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {MapLink} from '@/components/shared/map/link';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getSnorlaxRankAtEnergy} from '@/utils/game/snorlax';


type Props = Pick<TeamAnalysisDataProps, 'snorlaxRankData'> & {
  energy: number,
};

export const TeamAnalysisSnorlaxRank = ({energy, snorlaxRankData}: Props) => {
  const t = useTranslations('Game.Field');

  const snorlaxRank = React.useMemo(() => snorlaxRankData.map(({mapId, data}) => ({
    mapId,
    rank: getSnorlaxRankAtEnergy({energy, data}),
  })), [energy]);

  return (
    <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-2 2xl:grid-cols-4">
      {snorlaxRank.map(({mapId, rank}) => {
        const mapName = t(mapId.toString());

        return (
          <Flex key={mapId}>
            <MapLink mapId={mapId} className="h-16">
              <div className="whitespace-nowrap">
                {mapName}
              </div>
              {rank ?
                <SnorlaxRankUI rank={rank.rank}/> :
                <div className="h-6 w-6">
                  <XCircleIcon/>
                </div>}
            </MapLink>
          </Flex>
        );
      })}
    </Grid>
  );
};

import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
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
    <Flex direction="row" className="gap-1.5">
      {snorlaxRank.map(({mapId, rank}) => {
        const mapName = t(mapId.toString());

        return (
          <Flex key={mapId} direction="col">
            <MapLink mapId={mapId} className="h-16">
              <Flex direction="row" center wrap className="absolute left-0 top-0 z-10 h-full gap-1.5">
                <div className="whitespace-nowrap">
                  {mapName}
                </div>
                {rank ?
                  <SnorlaxRankUI rank={rank.rank}/> :
                  <div className="h-6 w-6">
                    <XCircleIcon/>
                  </div>}
              </Flex>
            </MapLink>
          </Flex>
        );
      })}
    </Flex>
  );
};

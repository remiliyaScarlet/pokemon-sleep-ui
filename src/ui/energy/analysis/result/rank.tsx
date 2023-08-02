import React from 'react';

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {MapLink} from '@/components/shared/map/link';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {imageGallerySizes} from '@/styles/image';
import {EnergyAnalysisDataProps} from '@/ui/energy/analysis/type';
import {getSnorlaxRankAtEnergy} from '@/utils/game/snorlax';


type Props = Pick<EnergyAnalysisDataProps, 'snorlaxRankData'> & {
  energy: number,
};

export const EnergyAnalysisSnorlaxRank = ({energy, snorlaxRankData}: Props) => {
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
              <Flex direction="row" center className="absolute left-0 top-0 z-10 h-full gap-1.5">
                <div className="whitespace-nowrap px-2">
                  {mapName}
                </div>
                {rank ?
                  <SnorlaxRankUI rank={rank.rank}/> :
                  <div className="h-6 w-6">
                    <XMarkIcon/>
                  </div>}
              </Flex>
            </MapLink>
          </Flex>
        );
      })}
    </Flex>
  );
};

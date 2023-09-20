import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {MapLink} from '@/components/shared/map/link';
import {BerryFavoriteInMapType} from '@/components/shared/pokemon/berry/favoriteType';
import {BerryLevelSlider} from '@/ui/berry/page/levelSlider';
import {BerryPageDataProps} from '@/ui/berry/page/type';


type Props = BerryPageDataProps & {
  level: number,
  setLevel: (level: number) => void,
};

export const BerryFavoriteInfoUi = ({berryData, favoriteInfo, level, setLevel}: Props) => {
  const t = useTranslations('Game.Field');

  return (
    <Flex direction="col" center className="info-section gap-1.5">
      <BerryLevelSlider berryData={berryData} level={level} setLevel={setLevel}/>
      <Flex direction="row" center wrap className="gap-1.5">
        {Object.entries(favoriteInfo).map(([mapId, type]) => {
          if (!type) {
            return <React.Fragment key={mapId}/>;
          }

          return (
            <MapLink key={mapId} mapId={mapId} className="h-24 w-64">
              <div className="text-xl">
                {t(mapId)}
              </div>
              <div className="h-10 w-10">
                <BerryFavoriteInMapType type={type}/>
              </div>
            </MapLink>
          );
        })}
      </Flex>
    </Flex>
  );
};

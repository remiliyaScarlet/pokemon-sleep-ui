import React from 'react';

import MapPinIcon from '@heroicons/react/24/outline/MapPinIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {MapLink} from '@/components/shared/map/link';
import {BonusSlider} from '@/components/shared/production/bonus/base';
import {BonusSliderProps} from '@/components/shared/production/bonus/type';
import {SleepMapId} from '@/types/game/sleepStyle';


type Props = BonusSliderProps & {
  mapId: SleepMapId,
};

export const MapBonusSlider = ({mapId, ...props}: Props) => {
  const t = useTranslations('Game');

  return (
    <Flex direction="row" className="gap-1">
      <MapLink mapId={mapId} className="w-64">
        <Flex direction="col" center className="z-10 gap-1.5">
          {t(`Field.${mapId}`)}
        </Flex>
      </MapLink>
      <BonusSlider id="map-bonus" min={0} max={100} step={5} {...props}>
        <div className="h-6 w-6">
          <MapPinIcon/>
        </div>
        <div className="h-6 w-6">
          <ChevronUpIcon/>
        </div>
      </BonusSlider>
    </Flex>
  );
};

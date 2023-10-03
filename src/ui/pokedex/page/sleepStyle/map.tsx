import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {MapLink} from '@/components/shared/map/link';
import {imageSmallIconSizes} from '@/styles/image';
import {SleepStyleOfMap} from '@/types/game/sleepStyle';
import {PokemonSingleSleepStyle} from '@/ui/pokedex/page/sleepStyle/single';
import {PokemonSleepStyleProps} from '@/ui/pokedex/page/sleepStyle/type';


type Props = PokemonSleepStyleProps & {
  sleepStyleOfMap: SleepStyleOfMap,
};

export const PokemonSleepStylesOfMap = ({sleepStyleOfMap, ...props}: Props) => {
  const {mapId, styles} = sleepStyleOfMap;

  const t = useTranslations('Game.Field');
  const t2 = useTranslations('UI.Common');

  const mapName = t(mapId.toString());

  return (
    <Flex key={mapId} direction="col" className="md:w-fit">
      <MapLink mapId={mapId} className="p-1.5" noAbsolute>
        <Flex direction="row" center className="z-10 p-1.5">
          <div>
            <div className="relative h-9 w-9">
              <NextImage src="/images/generic/map_pin.png" alt={t2('Map')} sizes={imageSmallIconSizes}/>
            </div>
          </div>
          <div className="text-lg">
            {mapName}
          </div>
        </Flex>
        <Flex direction="row" center wrap className="z-10 gap-1">
          {styles.map((sleepStyle) => (
            <PokemonSingleSleepStyle key={sleepStyle.style} sleepStyle={sleepStyle} {...props}/>
          ))}
        </Flex>
      </MapLink>
    </Flex>
  );
};

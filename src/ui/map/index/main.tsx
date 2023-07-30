import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {getSleepStyleByLocations} from '@/controller/sleepStyle';
import {imageGallerySizes, imageIconSizes} from '@/styles/image';
import {PageLayout} from '@/ui/base/layout';
import {toSum} from '@/utils/array';


export const MapIndex = () => {
  const data = React.use(getSleepStyleByLocations());

  const t = useTranslations('Game.Field');
  const t2 = useTranslations('UI.InPage.Map');

  return (
    <PageLayout>
      <Flex direction="row" center wrap className="gap-1.5">
        {Object.entries(data).map(([mapId, sleepStyles]) => {
          const mapName = t(mapId.toString());

          const sleepStyleCount = toSum(sleepStyles?.map(({styles}) => styles.length) ?? []);
          const pokemonCount = sleepStyles?.length ?? 0;

          return (
            <Flex
              key={mapId} direction="col" noFullWidth
              className="width-with-gap md:width-with-gap-2-items"
            >
              <Link key={mapId} href={`/map/${mapId}`} className="button-clickable-bg group relative h-40 p-1.5">
                <Image
                  src={`/images/field/${mapId}.png`} alt={mapName}
                  fill className="rounded-xl opacity-50 dark:opacity-25"
                  sizes={imageGallerySizes}
                />
                <Flex direction="col" center className="z-10 h-full gap-1 p-1.5">
                  <h4 className="text-xl">
                    {mapName}
                  </h4>
                  <Flex direction="row" center className="gap-4 text-lg">
                    <Flex direction="row" center noFullWidth className="gap-1.5">
                      <div className="relative h-6 w-6">
                        <Image
                          src="/images/generic/sleep.png" alt={t2('SleepStyle')} fill sizes={imageIconSizes}
                          className="invert-icon"
                        />
                      </div>
                      <div>
                        {sleepStyleCount}
                      </div>
                    </Flex>
                    <Flex direction="row" center noFullWidth className="gap-1.5">
                      <div className="relative h-6 w-6">
                        <Image
                          src="/images/generic/pokeball.png" alt={t2('Pokemon')} fill sizes={imageIconSizes}
                          className="invert-icon"
                        />
                      </div>
                      <div>
                        {pokemonCount}
                      </div>
                    </Flex>
                  </Flex>
                </Flex>
              </Link>
            </Flex>
          );
        })}
      </Flex>
    </PageLayout>
  );
};

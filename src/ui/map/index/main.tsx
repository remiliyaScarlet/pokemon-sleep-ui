import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {MapLink} from '@/components/shared/map/link';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getSleepStyleByMaps} from '@/controller/sleepStyle';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MapStats} from '@/ui/map/common/stats';


export const MapIndex = ({params}: DefaultPageProps) => {
  const {locale} = params;
  const data = React.use(getSleepStyleByMaps());
  const mapMeta = React.use(getAllMapMeta());

  const t = useTranslations('Game.Field');

  return (
    <PublicPageLayout locale={locale}>
      <Flex direction="col" className="gap-1.5 md:px-32 md:pt-32">
        <AdsUnit/>
        <Grid className="grid-cols-1 gap-1.5 md:grid-cols-2">
          {Object.entries(data).map(([mapId, sleepStyles]) => (
            <MapLink key={mapId} mapId={mapId} className="h-40">
              <Flex direction="col" className="z-10 gap-4">
                <div className="text-2xl">
                  {t(mapId.toString())}
                </div>
                <MapStats sleepStyles={sleepStyles} meta={mapMeta[Number(mapId)]}/>
              </Flex>
            </MapLink>
          ))}
        </Grid>
        <AdsUnit/>
      </Flex>
    </PublicPageLayout>
  );
};

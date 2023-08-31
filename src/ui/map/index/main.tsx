import React from 'react';

import {getAllMapMeta} from '@/controller/mapMeta';
import {getSleepStyleByMaps} from '@/controller/sleepStyle';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MapIndexContent} from '@/ui/map/index/content';


export const MapIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    data,
    mapMeta,
  ] = await Promise.all([
    getSleepStyleByMaps(),
    getAllMapMeta(),
  ]);

  return (
    <PublicPageLayout locale={locale}>
      <MapIndexContent data={data} mapMeta={mapMeta}/>
    </PublicPageLayout>
  );
};

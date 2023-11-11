import React from 'react';

import {MapPageParams} from '@/app/[locale]/map/[id]/page';
import {MapPage} from '@/components/shared/sleepStyle/page/main';
import {getSleepStyleNormalUnique} from '@/controller/sleepStyle';
import {PageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';


export const MapUniquePage = async ({params}: PageProps<MapPageParams>) => {
  const {id, locale} = params;

  const mapId = Number(id);

  return (
    <PublicPageLayout locale={locale}>
      <MapPage locale={locale} mapId={mapId} isUnique getDataPromise={() => getSleepStyleNormalUnique(mapId)}/>
    </PublicPageLayout>
  );
};

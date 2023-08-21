import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {getAllBerryData} from '@/controller/berry';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {BerryLink} from '@/ui/berry/index/link';


export const BerryIndex = () => {
  const berryDataMap = React.use(getAllBerryData());

  return (
    <PublicPageLayout>
      <AdsUnit/>
      <Grid center className="grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {Object.values(berryDataMap).map((berry) => <BerryLink key={berry.id} berryData={berry}/>)}
      </Grid>
      <AdsUnit/>
    </PublicPageLayout>
  );
};

import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {getAllBerryData} from '@/controller/berry';
import {PageLayout} from '@/ui/base/layout';
import {BerryLink} from '@/ui/berry/index/link';
import {classNames} from '@/utils/react';


export const BerryIndex = () => {
  const berryDataMap = React.use(getAllBerryData());

  return (
    <PageLayout>
      <AdsUnit/>
      <Flex direction="row" wrap center className="gap-2 p-3">
        {Object.values(berryDataMap).map((berry) => (
          <div
            key={berry.id}
            className={classNames(
              'relative width-with-gap width-with-gap-2-items sm:width-with-gap-3-items',
              'md:width-with-gap-5-items lg:width-with-gap-6-items xl:width-with-gap-8-items',
            )}
          >
            <BerryLink berryData={berry}/>
          </div>
        ))}
      </Flex>
      <AdsUnit/>
    </PageLayout>
  );
};

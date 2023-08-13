import React from 'react';

import {adsHeight} from '@/components/ads/const';
import {AdsUnitProps} from '@/components/ads/type';
import {isProduction} from '@/utils/environment';
import {classNames} from '@/utils/react';


export const AdsWrapper = ({children, className}: React.PropsWithChildren<AdsUnitProps>) => {
  return (
    <div className={classNames(
      className,
      'w-full overflow-auto',
      adsHeight,
      isProduction() ? undefined : 'border border-green-500',
    )}>
      {children}
    </div>
  );
};

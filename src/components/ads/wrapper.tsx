import React from 'react';

import {clsx} from 'clsx';

import {adsHeight} from '@/components/ads/const';
import {AdsUnitProps} from '@/components/ads/type';
import {isProduction} from '@/utils/environment';


export const AdsWrapper = ({children, className}: React.PropsWithChildren<AdsUnitProps>) => {
  return (
    <div className={clsx(
      'w-full overflow-auto',
      className,
      adsHeight,
      !isProduction() && 'border border-green-500',
    )}>
      {children}
    </div>
  );
};

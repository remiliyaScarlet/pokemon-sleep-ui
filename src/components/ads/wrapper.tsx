import React from 'react';

import {AdsUnitProps} from '@/components/ads/type';
import {isProduction} from '@/utils/environment';
import {classNames} from '@/utils/react';


export const AdsWrapper = ({children, className}: React.PropsWithChildren<AdsUnitProps>) => {
  return (
    <div className={classNames(className, isProduction() ? undefined : 'border border-green-500 h-20')}>
      {children}
    </div>
  );
};

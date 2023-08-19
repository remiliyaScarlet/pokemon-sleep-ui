import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {adsHeight} from '@/components/ads/const';
import {AdsUnitProps} from '@/components/ads/type';
import {isProduction} from '@/utils/environment';


export const AdsWrapper = ({children, className}: React.PropsWithChildren<AdsUnitProps>) => {
  const {data, status} = useSession();

  if (status === 'loading' || (status === 'authenticated' && data?.user.isAdsFree)) {
    return <div className="m-0.5"/>;
  }

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

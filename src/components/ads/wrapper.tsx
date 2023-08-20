import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {adsHeight} from '@/components/ads/const';
import {AdsUnitProps} from '@/components/ads/type';
import {isProduction} from '@/utils/environment';


export const AdsWrapper = ({children, className}: React.PropsWithChildren<AdsUnitProps>) => {
  const {data, status} = useSession();
  // Running `update()` of `useSession` puts the status to `loading`,
  // which causes the ads to blink briefly for users with ads
  // Therefore caching the ads-free status when the session loading is settled
  const [isAdsFree, setIsAdsFree] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      setIsAdsFree(false);
    } else if (status === 'authenticated' && data?.user.isAdsFree) {
      setIsAdsFree(true);
    }
  }, [status]);

  if (isAdsFree) {
    return <></>;
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

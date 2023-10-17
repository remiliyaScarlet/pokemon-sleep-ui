import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {adsRefreshIntervalMs} from '@/components/ads/const';
import {AdsContent} from '@/components/ads/content';
import {AdsUnitProps} from '@/components/ads/type';
import {Flex} from '@/components/layout/flex/common';


export const AdsWrapper = ({
  alwaysSingle,
  fullHeight,
  className,
  children,
}: React.PropsWithChildren<AdsUnitProps>) => {
  const {data, status} = useSession();
  // Running `update()` of `useSession` puts the status to `loading`,
  // which causes the ads to blink briefly for users with ads
  // Therefore caching the ads-free status when the session loading is settled
  const [isAdsFree, setIsAdsFree] = React.useState<boolean | null>(null);
  // Used to force ads rerender
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      setIsAdsFree(false);
    } else if (status === 'authenticated') {
      setIsAdsFree(data?.user.isAdsFree ?? false);
    }
  }, [status]);

  // Set an interval to trigger rerender on load
  React.useEffect(() => {
    setInterval(() => setCounter((original) => original + 1), adsRefreshIntervalMs);
  }, []);

  // `isAdsFree` can be `null` indicating not loaded yet, which is falsy
  // When `isAdsFree` is `null`, it shouldn't render anything because the app hasn't determined
  // if the user is ads free yet
  if (isAdsFree !== false) {
    return null;
  }

  return (
    <Flex direction="row" className={clsx(fullHeight && 'h-full', className)}>
      <AdsContent key={`${counter}a`} fullHeight={fullHeight}>
        {children}
      </AdsContent>
      {
        !alwaysSingle &&
        <AdsContent key={`${counter}b`} className="hidden lg:block" fullHeight={fullHeight}>
          {children}
        </AdsContent>
      }
    </Flex>
  );
};

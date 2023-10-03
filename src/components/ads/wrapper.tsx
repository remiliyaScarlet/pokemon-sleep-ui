import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useLocale} from 'next-intl';

import {AdsContent} from '@/components/ads/content';
import {AdsUnitProps} from '@/components/ads/type';
import {Grid} from '@/components/layout/grid';
import {Locale} from '@/types/next/locale';


export const AdsWrapper = ({children, className, alwaysSingle}: React.PropsWithChildren<AdsUnitProps>) => {
  const {data, status} = useSession();
  // Running `update()` of `useSession` puts the status to `loading`,
  // which causes the ads to blink briefly for users with ads
  // Therefore caching the ads-free status when the session loading is settled
  const [isAdsFree, setIsAdsFree] = React.useState<boolean | null>(null);
  const locale = useLocale();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      setIsAdsFree(false);
    } else if (status === 'authenticated') {
      setIsAdsFree(data?.user.isAdsFree ?? false);
    }
  }, [status]);

  // `isAdsFree` can be `null` indicating not loaded yet, which is falsy
  // When `isAdsFree` is `null`, it shouldn't render anything because the app hasn't determined
  // if the user is ads free yet
  if (isAdsFree !== false) {
    return <></>;
  }

  return (
    <Grid className={clsx('grid-cols-1', !alwaysSingle && 'lg:grid-cols-2', className)}>
      <AdsContent locale={locale as Locale}>
        {children}
      </AdsContent>
      {
        !alwaysSingle &&
        <AdsContent className="hidden lg:block" locale={locale as Locale}>
          {children}
        </AdsContent>
      }
    </Grid>
  );
};

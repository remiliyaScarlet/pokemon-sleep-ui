import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useLocale} from 'next-intl';

import {AdsContent} from '@/components/ads/content';
import {AdsUnitProps} from '@/components/ads/type';
import {Grid} from '@/components/layout/grid';
import {Locale} from '@/types/next/locale';


export const AdsWrapper = ({children, className}: React.PropsWithChildren<AdsUnitProps>) => {
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

  if (isAdsFree) {
    return <></>;
  }

  return (
    <Grid className="grid-cols-1 lg:grid-cols-2">
      <AdsContent className={className} locale={locale as Locale}>
        {children}
      </AdsContent>
      <AdsContent className={clsx('hidden lg:block', className)} locale={locale as Locale}>
        {children}
      </AdsContent>
    </Grid>
  );
};

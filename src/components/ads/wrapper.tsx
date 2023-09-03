import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useLocale} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {adsHeight, adsMessage} from '@/components/ads/const';
import {AdsUnitProps} from '@/components/ads/type';
import {defaultLocale} from '@/const/website';
import {Locale} from '@/types/next/locale';
import {isProduction} from '@/utils/environment';


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
    <div className={clsx(
      'relative w-full overflow-auto',
      className,
      adsHeight,
      isProduction() ? 'text-red-600 dark:text-red-400' : 'border border-green-500',
    )}>
      {
        !isAdsFree &&
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={clsx(
          'flex h-full w-full flex-col items-center justify-center text-center text-xl',
        )}>
          {adsMessage[locale as Locale] ?? adsMessage[defaultLocale]}
        </ReactMarkdown>
      }
      <div className="absolute left-0 top-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};

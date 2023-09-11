import React from 'react';

import {clsx} from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {adsHeight, adsMessage} from '@/components/ads/const';
import {defaultLocale} from '@/const/website';
import {Locale} from '@/types/next/locale';
import {isProduction} from '@/utils/environment';


type Props = {
  className?: string,
  locale: Locale,
};

export const AdsContent = ({className, locale, children}: React.PropsWithChildren<Props>) => {
  const [showAdsMessage, setShowAdsMessage] = React.useState(false);

  React.useEffect(() => {
    setShowAdsMessage(!document.querySelectorAll('ins > div').length);
  }, [document.querySelectorAll('ins > div').length]);

  return (
    <div className={clsx(
      'relative w-full overflow-auto',
      className,
      adsHeight,
      isProduction() ? (showAdsMessage && 'rounded-lg bg-red-500/40') : 'border border-green-500',
    )}>
      {
        showAdsMessage &&
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={clsx(
          'flex h-full w-full flex-col items-center justify-center text-center text-xl',
        )}>
          {adsMessage[locale] ?? adsMessage[defaultLocale]}
        </ReactMarkdown>
      }
      <div className="absolute left-0 top-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};

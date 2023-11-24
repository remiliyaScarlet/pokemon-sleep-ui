import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {adsHeight, adsHeightAdBlockActive} from '@/components/ads/const';
import {useAdBlockDetector} from '@/components/ads/hook';
import {AdBlockState} from '@/components/ads/type';
import {isProduction} from '@/utils/environment';


type Props = {
  className?: string,
};

export const AdsContent = ({className, children}: React.PropsWithChildren<Props>) => {
  const [adblockState, setAdblockState] = React.useState<AdBlockState>({
    adsFound: false,
    isBlocked: false,
  });

  const t = useTranslations('UI.Subscription');
  const adsRef = useAdBlockDetector({
    setAdblockState,
  });

  return (
    <div className={clsx(
      'relative w-full overflow-hidden',
      adblockState.isBlocked ? adsHeightAdBlockActive : adsHeight,
      adblockState.isBlocked && (isProduction() ? 'rounded-lg bg-red-500/40' : 'border border-green-500'),
      className,
    )}>
      {
        adblockState.isBlocked &&
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={clsx(
          'flex h-full w-full flex-col items-center justify-center text-center text-xl',
        )}>
          {t('AdBlockActive')}
        </ReactMarkdown>
      }
      <div ref={adsRef} className="absolute left-0 top-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};

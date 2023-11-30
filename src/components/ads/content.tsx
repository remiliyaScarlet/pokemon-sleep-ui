import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {adsHeight, adsHeightAdBlockActive} from '@/components/ads/const';
import {useAdBlockDetector} from '@/components/ads/hook/adBlockDetect';
import {useAdClickDetector} from '@/components/ads/hook/adClickDetect';
import {AdBlockState, AdsContentProps} from '@/components/ads/type';
import {isProduction} from '@/utils/environment';


export const AdsContent = ({
  className,
  heightOverride,
  children,
}: React.PropsWithChildren<AdsContentProps>) => {
  const [adblockState, setAdblockState] = React.useState<AdBlockState>({
    // Can't contain the word 'ads' here, or it'll get detected
    found: false,
    isBlocked: false,
  });

  const t = useTranslations('UI.Subscription');
  const adsRef = useAdBlockDetector({
    setAdblockState,
  });
  const {
    contentRef,
    ...adClickDetectProps
  } = useAdClickDetector();

  return (
    <div
      ref={contentRef}
      tabIndex={-1}
      {...adClickDetectProps}
      className={clsx(
        'relative w-full overflow-hidden focus:outline-none',
        adblockState.isBlocked ? adsHeightAdBlockActive : (heightOverride ?? adsHeight),
        adblockState.isBlocked && (isProduction() ? 'rounded-lg bg-red-500/40' : 'border border-green-500'),
        className,
      )}
    >
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

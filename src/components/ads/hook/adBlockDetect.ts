import React from 'react';

import {AdBlockState} from '@/components/ads/type';


type UseAdBlockDetectorOpts = {
  setAdblockState: React.Dispatch<React.SetStateAction<AdBlockState>>,
  recheckDeps: React.DependencyList,
};

export const useAdBlockDetector = ({setAdblockState, recheckDeps}: UseAdBlockDetectorOpts) => {
  const adsRef = React.useRef<HTMLDivElement>(null);

  const observer = new MutationObserver((mutations) => {
    setAdblockState({
      found: mutations.every(({addedNodes, removedNodes}) => !!addedNodes.length && !removedNodes.length),
      isBlocked: false,
    });
  });

  React.useEffect(() => {
    if (!adsRef.current) {
      return;
    }

    observer.observe(adsRef.current, {childList: true, subtree: true});

    return () => observer.disconnect();
  }, [adsRef.current]);

  React.useEffect(() => {
    // Simply keep checking every 15 secs
    // uBO has a `no-setTimeout` defuser that invalidates the very 1st call of the `setTimeout()`
    // https://github.com/gorhill/uBlock/wiki/Resources-Library#no-settimeout-ifjs-
    setInterval(() => setAdblockState((original) => ({
      ...original,
      isBlocked: !original.found && !adsRef.current?.querySelector('ins.adsbygoogle > div'),
    } satisfies AdBlockState)), 15000);
  }, recheckDeps);

  return adsRef;
};

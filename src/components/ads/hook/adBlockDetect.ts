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
    // If no DOM mutation detected after the hook is loaded for 7 secs, assume ad-block in effect
    setTimeout(() => setAdblockState((original) => ({
      ...original,
      isBlocked: !original.found && !adsRef.current?.querySelector('ins.adsbygoogle > div'),
    })), 7000);
  }, recheckDeps);

  return adsRef;
};

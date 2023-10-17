import React from 'react';

import {adsPopupLockDurationMs, adsPopupShowIntervalMs} from '@/components/ads/popup/const';
import {AdsPopupControl, AdsPopupState} from '@/components/ads/popup/type';


export const useAdsPopup = (): AdsPopupControl => {
  const [state, setState] = React.useState<AdsPopupState>({
    show: false,
    locked: false,
  });

  const scheduleUnlock = React.useCallback(
    () => setTimeout(() => setState((original) => ({
      ...original,
      locked: false,
    })), adsPopupLockDurationMs),
    [],
  );
  const scheduleShow = React.useCallback(
    () => {
      setTimeout(() => setState({
        show: true,
        locked: true,
      }), adsPopupShowIntervalMs);
      scheduleUnlock();
    },
    [],
  );

  // Schedule on initial load
  React.useEffect(scheduleShow, []);

  return {
    state,
    setShow: (show) => setState((original): AdsPopupState => {
      if (!show) {
        if (original.locked) {
          return {...original, show: true};
        }

        scheduleShow();
      }

      return {...original, show};
    }),
  };
};

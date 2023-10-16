import React from 'react';

import {adsPopupLockDurationMs} from '@/components/ads/popup/const';
import {AdsPopupControl, AdsPopupState} from '@/components/ads/popup/type';


type UseAdsPopupOpts = {
  showInterval: number,
};

export const useAdsPopup = ({showInterval}: UseAdsPopupOpts): AdsPopupControl => {
  const [state, setState] = React.useState<AdsPopupState>({
    counterWhenShowed: 0,
    show: false,
    locked: false,
  });
  const counter = React.useRef(0);

  if (!state.locked) {
    counter.current = counter.current + 1;
  }

  React.useEffect(() => {
    if (counter.current - state.counterWhenShowed < showInterval) {
      return;
    }

    setState({
      show: true,
      locked: true,
      counterWhenShowed: counter.current,
    });

    setTimeout(() => setState((original) => ({
      ...original,
      locked: false,
    })), adsPopupLockDurationMs);
  }, [counter.current]);

  return {
    state,
    setShow: (show) => setState((original): AdsPopupState => {
      if (original.locked) {
        return {...original, show: true};
      }

      return {...original, show};
    }),
    counter: counter.current,
    increaseCounter: (count) => counter.current += count,
  };
};

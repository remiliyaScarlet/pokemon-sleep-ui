import React from 'react';

import {RatingPopupControl, RatingPopupControlState} from '@/components/shared/pokemon/rating/type';


export const useRatingPopup = (): RatingPopupControl => {
  const [state, setState] = React.useState<RatingPopupControlState>({
    show: false,
    request: undefined,
  });

  return {
    state,
    setState,
    setRequest: (request) => setState({show: true, request}),
  };
};


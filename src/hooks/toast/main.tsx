import React from 'react';

import {PremiumOnlyNotice} from '@/components/static/premium/notice';
import {showToast} from '@/utils/toast';


export const usePremiumRequiredToast = () => {
  const showPremiumRequiredToast = React.useCallback(() => showToast({
    isAlert: true,
    content: <PremiumOnlyNotice className="[&_a]:text-link-inverse"/>,
  }), []);

  return {showPremiumRequiredToast};
};

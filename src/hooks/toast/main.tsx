import React from 'react';

import {PremiumOnly} from '@/components/static/premiumOnly';
import {showToast} from '@/utils/toast';


export const usePremiumRequiredToast = () => {
  const showPremiumRequiredToast = React.useCallback(() => showToast({
    isAlert: true,
    content: (
      <PremiumOnly className="[&_a]:text-link-inverse"/>
    ),
  }), []);

  return {showPremiumRequiredToast};
};

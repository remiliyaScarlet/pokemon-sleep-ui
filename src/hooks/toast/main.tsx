import React from 'react';

import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {showToast} from '@/utils/toast';


export const usePremiumRequiredToast = () => {
  const t = useTranslations('UI.Subscription');

  const showPremiumRequiredToast = React.useCallback(() => showToast({
    isAlert: true,
    content: (
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="[&_a]:text-link-inverse">
        {t('PremiumOnly')}
      </ReactMarkdown>
    ),
  }), []);

  return {showPremiumRequiredToast};
};

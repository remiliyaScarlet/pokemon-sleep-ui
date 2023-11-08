import React from 'react';

import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


export const AdsPopupText = () => {
  const t = useTranslations('UI.Subscription');

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown text-xl">
      {t('Popup')}
    </ReactMarkdown>
  );
};

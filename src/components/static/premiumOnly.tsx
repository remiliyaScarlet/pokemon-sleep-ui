import React from 'react';

import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


type Props = {
  className?: string,
};

export const PremiumOnly = ({className}: Props) => {
  const t = useTranslations('UI.Subscription');

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className={className}>
      {t('PremiumOnly')}
    </ReactMarkdown>
  );
};

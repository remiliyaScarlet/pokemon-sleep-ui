import React from 'react';

import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {Flex} from '@/components/layout/flex/common';


export const ProducingParamsNotice = () => {
  const t = useTranslations('UI.InPage.ProducingParams');

  return (
    <Flex className="rounded-lg p-1.5 shadow-border dark:shadow-slate-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">
        {t('Notice')}
      </ReactMarkdown>
    </Flex>
  );
};

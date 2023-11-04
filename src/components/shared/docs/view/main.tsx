import React from 'react';

import {clsx} from 'clsx';
import ReactMarkdown from 'react-markdown';

import {DocRenderingCommonProps} from '@/components/shared/docs/type';
import {tableOfContentsText} from '@/components/shared/docs/view/const';
import {remarkDirectiveComponents} from '@/components/shared/docs/view/directive/const';
import {rehypePlugins, remarkPlugins} from '@/components/shared/docs/view/plugins/const';

import 'katex/dist/katex.min.css';


type Props = DocRenderingCommonProps & {
  className?: string,
};

export const DocsContentView = ({locale, doc, className}: Props) => {
  const {showIndex} = doc;

  const content = [
    showIndex && `## ${tableOfContentsText[locale]}`,
    doc.content,
  ]
    .filter((content) => !!content)
    .join('\n');

  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      className={clsx('markdown flex flex-col gap-2 break-words p-2', className)}
      components={remarkDirectiveComponents}
    >
      {content}
    </ReactMarkdown>
  );
};

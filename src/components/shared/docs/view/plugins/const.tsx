import {Options as ReactMarkdownOptions} from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc, {Options as RemarkTocOptions} from 'remark-toc';

import {tableOfContentsText} from '@/components/shared/docs/view/const';


export const remarkPlugins: ReactMarkdownOptions['remarkPlugins'] = [
  remarkBreaks,
  remarkDirective,
  remarkDirectiveRehype,
  remarkMath,
  remarkGfm,
  [remarkToc, {heading: `(${Object.values(tableOfContentsText).join('|')})`} satisfies RemarkTocOptions],
];

export const rehypePlugins: ReactMarkdownOptions['remarkPlugins'] = [
  rehypeAutolinkHeadings,
  rehypeKatex,
  rehypeSlug,
];

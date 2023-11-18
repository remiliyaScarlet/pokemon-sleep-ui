import {revalidatePath} from 'next/cache';

import {DocsDataEditable} from '@/types/mongo/docs';


export const docsRelatedSeparator = ';';

export const toRelatedPathForStorage = (related: string[]): string[] => related
  .map((expr) => {
    // If the expression is already wrapped, it should not get wrapped again
    if (expr.startsWith('^') && expr.endsWith('$')) {
      return expr;
    }

    return `^${expr.replaceAll('*', '.*')}$`;
  });

export const toRelatedPathForDisplay = (related: string[]): string => related
  .map((expr) => (
    expr
      .replaceAll('^', '')
      .replaceAll('$', '')
      .replaceAll('.*', '*')
  ))
  .join(docsRelatedSeparator);

export const invalidateDocsPathCaching = ({locale, path}: DocsDataEditable) => {
  revalidatePath(`/${locale}/docs/view/${path}`);
  revalidatePath(`/${locale}/docs/edit/${path}`);
};

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

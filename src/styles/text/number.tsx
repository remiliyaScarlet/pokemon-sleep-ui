type GetNumberStylesOpts = {
  num: number | null | undefined,
  base?: number,
};

export const getNumberStyles = ({num, base = 0}: GetNumberStylesOpts): string | null => {
  if (num && num > base) {
    return 'text-green-700 dark:text-green-300';
  }

  if (num && num < base) {
    return 'text-red-700 dark:text-red-300';
  }

  return null;
};

export const toUnique = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const toSum = (arr: number[]): number => arr.reduce((prev, curr) => prev + curr, 0);

export const isNotNullish = <TValue>(value: TValue | null | undefined): value is TValue => {
  if (value === null || value === undefined) {
    return false;
  }

  // noinspection BadExpressionStatementJS
  value satisfies TValue;
  return true;
};

import {isNotNullish} from '@/utils/type';


const formatter = {
  float3: new Intl.NumberFormat(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3}),
  float: new Intl.NumberFormat(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
  int: new Intl.NumberFormat(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}),
};

export const formatFloat3 = (num: number | null | undefined): string | null => {
  if (isNotNullish(num)) {
    return formatter.float3.format(num);
  }

  return '-';
};

export const formatFloat = (num: number | null | undefined): string | null => {
  if (isNotNullish(num)) {
    return formatter.float.format(num);
  }

  return '-';
};

export const formatInt = (num: number | null | undefined): string | null => {
  if (isNotNullish(num)) {
    return formatter.int.format(num);
  }

  return '-';
};

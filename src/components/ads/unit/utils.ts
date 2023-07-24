import {AdSenseValue} from '@/components/ads/unit/types';


type GetAdSenseValue = {
  value: AdSenseValue,
  theme: string | undefined,
};

export const getAdSenseValue = ({value, theme}: GetAdSenseValue) => {
  return theme ? value[theme] : value.light;
};

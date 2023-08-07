import {Dimension} from '@/types/style';


export type IconProps = {
  alt: string,
  dimension?: Dimension,
  noWrap?: false,
} | {
  alt: string,
  dimension?: never,
  noWrap?: true,
};

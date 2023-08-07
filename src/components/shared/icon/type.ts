import {Dimension} from '@/types/style';


export type IconProps = {
  alt: string,
  className?: string,
} & ({
  dimension?: Dimension,
  noWrap?: false,
} | {
  dimension?: never,
  noWrap?: true,
});

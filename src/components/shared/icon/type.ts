import {Dimension} from '@/types/style';


export type IconProps = {
  alt: string,
  noInvert?: boolean,
  noShrink?: boolean,
  isActive?: boolean,
  dropShadow?: boolean,
} & ({
  dimension?: Dimension,
  noWrap?: false,
} | {
  dimension?: never,
  noWrap?: true,
});

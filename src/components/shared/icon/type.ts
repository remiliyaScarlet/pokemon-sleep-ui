import {Dimension} from '@/types/style';


export type IconPropsOfBase = {
  alt: string,
  noInvert?: boolean,
  noShrink?: boolean,
  isActive?: boolean,
  dropShadow?: boolean,
  className?: string,
};

export type IconPropsOfWrap = {
  dimension?: Dimension,
  noWrap?: false,
} | {
  dimension?: never,
  noWrap?: true,
};

export type IconProps = IconPropsOfBase & IconPropsOfWrap;

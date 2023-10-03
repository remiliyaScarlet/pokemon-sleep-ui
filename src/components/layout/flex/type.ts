import {LayoutProps} from '@/components/layout/type';


export type FlexCommonProps = LayoutProps & {
  direction?: 'row' | 'col',
  wrap?: boolean,
};

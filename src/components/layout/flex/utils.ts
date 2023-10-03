import clsx from 'clsx';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getLayoutClassNames} from '@/components/layout/util';
import {RequireKeys} from '@/utils/type';


export type GetFlexStylesOpts = RequireKeys<FlexCommonProps, 'direction'>;

export const getFlexStyles = (props: GetFlexStylesOpts) => {
  const {direction, wrap} = props;

  return clsx(
    'flex',
    direction === 'row' ? 'flex-row' : 'flex-col',
    wrap && 'flex-wrap',
    getLayoutClassNames(props),
  );
};

import {UrlObject} from 'url';

import React from 'react';

import Link from 'next-intl/link';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


type Props = FlexCommonProps & {
  href: string | UrlObject,
};

export const FlexLink = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<Props>>(({
  direction = 'row',
  noFullWidth = true,
  href,
  children,
  ...props
}, ref) => (
  <Link ref={ref} href={href} className={getFlexStyles(direction, {noFullWidth, ...props})}>
    {children}
  </Link>
));
FlexLink.displayName = 'FlexLink';

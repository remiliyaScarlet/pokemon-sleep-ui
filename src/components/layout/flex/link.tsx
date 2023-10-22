import {UrlObject} from 'url';

import React from 'react';

import {Link} from '@/components/i18n';
import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


type Props = FlexCommonProps & {
  href: string | UrlObject,
};

const FlexLinkInternal = ({
  direction = 'row',
  noFullWidth = true,
  href,
  children,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLAnchorElement>) => (
  <Link ref={ref} href={href} className={getFlexStyles(direction, {noFullWidth, ...props})}>
    {children}
  </Link>
);

export const FlexLink = React.forwardRef(FlexLinkInternal);

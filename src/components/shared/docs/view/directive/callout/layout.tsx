import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {MarkdownCalloutProps} from '@/components/shared/docs/view/directive/callout/type';


type Props = MarkdownCalloutProps & {
  className: `text-${string} shadow-${string}`,
  icon: React.ReactNode,
};

export const MarkdownCalloutLayout = ({children, className, icon}: Props) => {
  return (
    <Flex className={clsx('gap-1 rounded-lg p-1.5 shadow-border lg:flex-row', className)}>
      {icon}
      {children}
    </Flex>
  );
};

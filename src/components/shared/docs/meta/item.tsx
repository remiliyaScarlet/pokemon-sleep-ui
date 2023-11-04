import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  icon: React.ReactNode,
  content: string,
  className?: string,
};

export const DocsMetaItem = ({icon, content, className}: Props) => {
  return (
    <Flex direction="row" noFullWidth className={clsx('items-center gap-1', className)}>
      {icon}
      {content}
    </Flex>
  );
};

import React from 'react';

import {CopyButton} from '@/components/layout/copyable/button';
import {Flex} from '@/components/layout/flex/common';


type Props = {
  content: string,
};

export const Copyable = ({content}: Props) => {
  return (
    <Flex direction="row" center className="justify-between rounded-lg bg-slate-500/20">
      <pre className="truncate px-2">
        {content}
      </pre>
      <div>
        <CopyButton data={content}/>
      </div>
    </Flex>
  );
};

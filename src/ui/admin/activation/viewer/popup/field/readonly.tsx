import React from 'react';

import {Copyable} from '@/components/layout/copyable/main';
import {Flex} from '@/components/layout/flex/common';


type Props = {
  title: string,
  data: string,
};

export const ActivationReadonlyField = ({title, data}: Props) => {
  return (
    <Flex className="gap-1">
      <div>{title}</div>
      <Copyable content={data}/>
    </Flex>
  );
};

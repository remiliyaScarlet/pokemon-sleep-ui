import React from 'react';

import {Flex} from '@/components/layout/flex';


type Props = {
  title: string,
};

export const AboutSection = ({title, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="col" className="gap-1">
      <div className="text-slate-500">
        {title}
      </div>
      <div className="text-lg">
        {children}
      </div>
    </Flex>
  );
};

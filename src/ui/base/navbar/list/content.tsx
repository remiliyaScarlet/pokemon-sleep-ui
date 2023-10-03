import React from 'react';

import {Flex} from '@/components/layout/flex';
import {NavHomepage} from '@/ui/base/navbar/home';


export const NavListContent = () => {
  return (
    <Flex direction="col" className="info-section-opaque h-full overflow-y-scroll p-6">
      <NavHomepage/>
    </Flex>
  );
};

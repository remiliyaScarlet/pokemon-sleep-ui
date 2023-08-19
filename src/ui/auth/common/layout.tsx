import React from 'react';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {PageLayout} from '@/ui/base/layout/common';


export const AuthLayout = ({children}: React.PropsWithChildren) => {
  return (
    <PageLayout noUserControl>
      <Flex direction="col" center>
        <Flex direction="col" center className="gap-5 sm:w-2/3 md:w-1/2 xl:w-1/3">
          <div className="relative h-36 w-36">
            <NextImage
              src="/images/rank/4.png"
              alt="Pokemon Sleep"
              sizes={imageIconSizes}
            />
          </div>
          {children}
        </Flex>
      </Flex>
    </PageLayout>
  );
};

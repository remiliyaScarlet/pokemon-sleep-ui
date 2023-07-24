import React from 'react';

import {isProduction} from '@/utils/environment';
import {classNames} from '@/utils/react';


type Props = {
  className?: string,
};

export const AdsWrapper = ({children, className}: React.PropsWithChildren<Props>) => {
  return (
    <div className={classNames(className, isProduction() ? undefined : 'border-1 border-green-500')}>
      {children}
    </div>
  );
};

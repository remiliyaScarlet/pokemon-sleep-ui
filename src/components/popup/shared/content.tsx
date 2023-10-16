import React from 'react';

import {PopupBody} from '@/components/popup/shared/body';
import {PopupControl} from '@/components/popup/shared/control';
import {PopupProps} from '@/components/popup/type';


export const PopupContent = ({children, ...props}: React.PropsWithChildren<PopupProps>) => {
  return (
    <>
      <PopupControl {...props}/>
      <PopupBody>
        {children}
      </PopupBody>
    </>
  );
};

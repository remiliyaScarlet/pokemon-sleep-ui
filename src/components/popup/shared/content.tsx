import React from 'react';

import {PopupBody} from '@/components/popup/shared/body';
import {PopupControl} from '@/components/popup/shared/control';
import {PopupProps} from '@/components/popup/type';


export const PopupContent = ({setShow, children}: React.PropsWithChildren<PopupProps>) => {
  return (
    <>
      <PopupControl setShow={setShow}/>
      <PopupBody>
        {children}
      </PopupBody>
    </>
  );
};

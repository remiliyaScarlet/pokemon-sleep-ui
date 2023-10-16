import React from 'react';

import {popupWindowStyle} from '@/components/popup/const';
import {PopupContent} from '@/components/popup/shared/content';
import {PopupProps} from '@/components/popup/type';
import {PopupUltimateContent} from '@/components/popup/ultimate/content';


export const PopupUltimate = (props: React.PropsWithChildren<PopupProps>) => {
  return (
    <PopupUltimateContent className={popupWindowStyle} {...props}>
      <PopupContent {...props}/>
    </PopupUltimateContent>
  );
};

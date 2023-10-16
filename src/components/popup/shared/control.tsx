import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PopupClose} from '@/components/popup/shared/close';
import {PopupControlCommonProps} from '@/components/popup/type';


type Props = PopupControlCommonProps & {
  title?: string,
};

export const PopupControl = ({title, setShow, closeDisabled}: Props) => {
  return (
    <Flex direction="row" className="justify-between rounded-t-lg bg-slate-500/20 p-2">
      <div>{title}</div>
      <PopupClose onClick={() => setShow && setShow(false)} disabled={closeDisabled}/>
    </Flex>
  );
};

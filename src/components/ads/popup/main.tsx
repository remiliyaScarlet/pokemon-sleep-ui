import React from 'react';

import {AdsConfiguredDisplay} from '@/components/ads/configured/display';
import {AdsPopupControl} from '@/components/ads/popup/type';
import {Flex} from '@/components/layout/flex/common';
import {PopupUltimate} from '@/components/popup/ultimate/main';


type Props = {
  control: AdsPopupControl,
};

export const AdsPopup = ({control}: Props) => {
  const {state, setShow} = control;
  const {show, locked} = state;

  return (
    <PopupUltimate show={show} setShow={setShow} closeDisabled={locked}>
      <Flex className="h-[70vh] md:w-[60vw] lg:w-[50vw]">
        <AdsConfiguredDisplay alwaysSingle/>
        <AdsConfiguredDisplay alwaysSingle/>
      </Flex>
    </PopupUltimate>
  );
};

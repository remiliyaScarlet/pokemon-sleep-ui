'use client';
import React from 'react';

import {AdsConfiguredDisplay} from '@/components/ads/configured/display';
import {useAdsPopup} from '@/components/ads/popup/hook';
import {AdsPopupText} from '@/components/ads/popup/text';
import {Flex} from '@/components/layout/flex/common';
import {PopupUltimate} from '@/components/popup/ultimate/main';


export const AdsPopup = () => {
  const {state, setShow} = useAdsPopup();
  const {show, locked} = state;

  return (
    <PopupUltimate show={show} setShow={setShow} closeDisabled={locked}>
      <Flex className="max-h-[90vh] gap-1.5 md:w-[60vw] lg:w-[50vw]">
        <AdsPopupText/>
        <AdsConfiguredDisplay alwaysSingle heightOverride="h-[30vh]"/>
        <AdsConfiguredDisplay alwaysSingle heightOverride="h-[30vh]"/>
      </Flex>
    </PopupUltimate>
  );
};

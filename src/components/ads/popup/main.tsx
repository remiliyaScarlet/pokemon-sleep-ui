'use client';
import React from 'react';

import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {AdsConfiguredDisplay} from '@/components/ads/configured/display';
import {useAdsPopup} from '@/components/ads/popup/hook';
import {Flex} from '@/components/layout/flex/common';
import {PopupUltimate} from '@/components/popup/ultimate/main';


export const AdsPopup = () => {
  const {state, setShow} = useAdsPopup();
  const {show, locked} = state;

  const t = useTranslations('UI.Ads');

  return (
    <PopupUltimate show={show} setShow={setShow} closeDisabled={locked}>
      <Flex className="h-[70vh] gap-1.5 md:w-[60vw] lg:w-[50vw]">
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">
          {t('Popup')}
        </ReactMarkdown>
        <AdsConfiguredDisplay alwaysSingle/>
        <AdsConfiguredDisplay alwaysSingle/>
      </Flex>
    </PopupUltimate>
  );
};

'use client';
import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';

import {usePathname} from '@/components/i18n';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {DocsAutoLinkPopup} from '@/components/shared/docs/autoLink/popup';
import {getDocsRelatedFromApi} from '@/const/api/docs';
import {DocsMetadata} from '@/types/mongo/docs';


export const DocsAutoLinkClient = () => {
  const path = usePathname();
  const [metaList, setMetaList] = React.useState<DocsMetadata[]>([]);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    // `.slice(1)` because `related` of `DocsData` do not store heading slash (/),
    // but `usePathname()` always return the path starting with slash.
    getDocsRelatedFromApi(new URLSearchParams({path: path.slice(1)})).then(setMetaList);
  }, []);

  return (
    <AnimatedCollapseQuick show={!!metaList.length}>
      <PopupCommon show={show} setShow={setShow}>
        <DocsAutoLinkPopup metaList={metaList}/>
      </PopupCommon>
      <Flex className="items-end">
        <button className="button-clickable-bg w-fit !rounded-full p-1" onClick={() => setShow(true)}>
          <QuestionMarkCircleIcon className="h-6 w-6"/>
        </button>
      </Flex>
    </AnimatedCollapseQuick>
  );
};

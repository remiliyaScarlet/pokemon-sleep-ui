import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {DocsMetaCreatedUI} from '@/components/shared/docs/meta/created';
import {DocsMetaLastUpdatedUI} from '@/components/shared/docs/meta/lastUpdated';
import {DocsMetaViewCountUI} from '@/components/shared/docs/meta/viewCount';
import {DocsMetadata} from '@/types/mongo/docs';


type Props = {
  doc: DocsMetadata,
};

export const DocsMetadataUI = ({doc}: Props) => {
  const {
    title,
    viewCount,
    createdEpoch,
    lastUpdatedEpoch,
  } = doc;

  return (
    <Flex className="info-section">
      <Flex className="text-2xl">
        {title}
      </Flex>
      <Flex className="items-end justify-between gap-1 md:flex-row">
        <Flex className="gap-1" noFullWidth>
          <DocsMetaCreatedUI createdEpoch={createdEpoch}/>
          <DocsMetaLastUpdatedUI lastUpdatedEpoch={lastUpdatedEpoch}/>
        </Flex>
        <DocsMetaViewCountUI viewCount={viewCount}/>
      </Flex>
    </Flex>
  );
};

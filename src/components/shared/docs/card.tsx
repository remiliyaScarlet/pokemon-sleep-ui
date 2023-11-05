import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {DocsMetaLastUpdatedUI} from '@/components/shared/docs/meta/lastUpdated';
import {DocsMetaViewCountUI} from '@/components/shared/docs/meta/viewCount';
import {DocsMetadata} from '@/types/mongo/docs';


type Props = {
  metadata: DocsMetadata,
};

export const DocsMetaCard = ({metadata}: Props) => {
  return (
    <FlexLink direction="col" href={`/docs/view/${metadata.path}`} className={clsx(
      'button-clickable-bg gap-1 rounded-lg p-1.5',
    )}>
      <div>
        {metadata.title}
      </div>
      <Flex direction="row" noFullWidth className="gap-1">
        <DocsMetaLastUpdatedUI lastUpdatedEpoch={metadata.lastUpdatedEpoch}/>
        <DocsMetaViewCountUI viewCount={metadata.viewCount} enlargeOnWide={false}/>
      </Flex>
    </FlexLink>
  );
};

import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import format from 'date-fns/format';

import {Flex} from '@/components/layout/flex/common';
import {DocsMetaItem} from '@/components/shared/docs/meta/item';
import {DocsMetadata} from '@/types/mongo/docs';
import {formatInt} from '@/utils/number/format';


type Props = {
  doc: DocsMetadata,
};

export const DocsMeta = ({doc}: Props) => {
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
          <DocsMetaItem
            icon={<PlusCircleIcon className="h-6 w-6"/>}
            content={format(createdEpoch, 'yyyy-MM-dd HH:mm:ss')}
          />
          <DocsMetaItem
            icon={<CloudArrowUpIcon className="h-6 w-6"/>}
            content={format(lastUpdatedEpoch, 'yyyy-MM-dd HH:mm:ss')}
          />
        </Flex>
        <DocsMetaItem
          icon={<EyeIcon className="h-6 w-6 md:h-7 md:w-7"/>}
          content={formatInt(viewCount)}
          className="md:text-xl"
        />
      </Flex>
    </Flex>
  );
};

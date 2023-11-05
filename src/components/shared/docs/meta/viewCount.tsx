import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {clsx} from 'clsx';

import {DocsMetaItem} from '@/components/shared/docs/meta/item';
import {formatInt} from '@/utils/number/format';


type Props = {
  viewCount: number,
  enlargeOnWide?: boolean,
};

export const DocsMetaViewCountUI = ({viewCount, enlargeOnWide = true}: Props) => {
  return (
    <DocsMetaItem
      icon={<EyeIcon className={clsx('h-6 w-6', enlargeOnWide && 'md:h-7 md:w-7')}/>}
      content={formatInt(viewCount)}
      className={clsx(enlargeOnWide && 'md:text-xl')}
    />
  );
};

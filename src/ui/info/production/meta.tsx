import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import format from 'date-fns/format';

import {Flex} from '@/components/layout/flex/common';
import {PokemonProducingParamsMeta} from '@/types/game/pokemon/producing';
import {Dimension} from '@/types/style';
import {formatInt} from '@/utils/number/format';


type Props = {
  meta: PokemonProducingParamsMeta | null,
};

export const ProducingParamsMeta = ({meta}: Props) => {
  if (!meta) {
    return null;
  }

  const {dataCount, lastUpdated} = meta;

  const dimension: Dimension = 'h-6 w-6';

  return (
    <Flex className="info-section text-xl md:flex-row md:justify-between">
      <Flex noFullWidth direction="row" className="items-center gap-1">
        <DocumentTextIcon className={dimension}/>
        <div>{formatInt(dataCount)}</div>
      </Flex>
      <Flex noFullWidth direction="row" className="items-center gap-1">
        <CloudArrowUpIcon className={dimension}/>
        <div>{format(lastUpdated * 1000, 'yyyy-MM-dd HH:mm:ss')}</div>
      </Flex>
    </Flex>
  );
};

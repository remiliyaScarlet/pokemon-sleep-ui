import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokeboxViewerConfig} from '@/ui/team/pokebox/viewer/config';
import {PokeboxViewerFilterUI} from '@/ui/team/pokebox/viewer/filter';
import {PokeboxViewerInputCommonProps} from '@/ui/team/pokebox/viewer/type';


export const PokeboxViewerInput = (props: PokeboxViewerInputCommonProps) => {
  return (
    <Flex direction="col" className="gap-1.5">
      <PokeboxViewerFilterUI {...props}/>
      <PokeboxViewerConfig {...props}/>
    </Flex>
  );
};

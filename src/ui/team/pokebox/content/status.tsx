import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokeboxCount, PokeboxCountProps} from '@/ui/team/pokebox/content/count';
import {PokeboxPreviewStatus, PokeboxPreviewStatusProps} from '@/ui/team/pokebox/content/preview/main';


type Props = PokeboxCountProps & PokeboxPreviewStatusProps;

export const PokeboxViewStatus = (props: Props) => {
  return (
    <Flex className="justify-between">
      <PokeboxPreviewStatus {...props}/>
      <PokeboxCount {...props}/>
    </Flex>
  );
};

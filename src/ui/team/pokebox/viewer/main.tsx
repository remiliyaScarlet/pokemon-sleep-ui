import React from 'react';

import {PokeboxViewerConfig} from '@/ui/team/pokebox/viewer/config';
import {PokeboxViewerFilterUI} from '@/ui/team/pokebox/viewer/filter';
import {PokeboxViewerInputCommonProps} from '@/ui/team/pokebox/viewer/type';


export const PokeboxViewerInput = (props: PokeboxViewerInputCommonProps) => {
  return (
    <>
      <PokeboxViewerFilterUI {...props}/>
      <PokeboxViewerConfig {...props}/>
    </>
  );
};

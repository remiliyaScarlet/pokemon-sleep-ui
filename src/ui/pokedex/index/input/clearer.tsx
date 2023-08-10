import React from 'react';

import {BackspaceIcon} from '@heroicons/react/24/outline';
import {Session} from 'next-auth';

import {PokedexInputProps} from '@/ui/pokedex/index/input/type';
import {generateInitialFilter} from '@/ui/pokedex/index/utils';


type Props = {
  setFilter: PokedexInputProps['setFilter'],
  session: Session | null,
};

export const PokedexInputClearer = ({setFilter, session}: Props) => {
  return (
    <button
      className="button-clickable-bg !rounded-full p-1.5"
      onClick={() => setFilter(generateInitialFilter(session))}
    >
      <div className="h-6 w-6">
        <BackspaceIcon/>
      </div>
    </button>
  );
};

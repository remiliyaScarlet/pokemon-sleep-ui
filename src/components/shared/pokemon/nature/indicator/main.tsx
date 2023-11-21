import React from 'react';

import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';

import {Flex} from '@/components/layout/flex/common';
import {PokemonNatureIndicatorText} from '@/components/shared/pokemon/nature/indicator/text';
import {PokemonNatureIndicatorCommonProps} from '@/components/shared/pokemon/nature/indicator/type';


export const PokemonNatureIndicator = (props: PokemonNatureIndicatorCommonProps) => {
  const {hideName} = props;

  return (
    <Flex direction="row" center noFullWidth>
      {!hideName && <ChevronUpDownIcon className="h-5 w-5"/>}
      <div>
        <PokemonNatureIndicatorText {...props}/>
      </div>
    </Flex>
  );
};

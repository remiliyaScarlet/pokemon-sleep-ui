import React from 'react';

import {clsx} from 'clsx';

import {FadingLayout} from '@/components/layout/fading/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonProducingRateSingleAtItem} from '@/components/shared/pokemon/production/single/item';
import {PokemonProducingRateSingleAtTotal} from '@/components/shared/pokemon/production/single/total';
import {PokemonProducingRateSingleProps} from '@/components/shared/pokemon/production/single/type';


export const PokemonProducingRateSingle = (props: PokemonProducingRateSingleProps) => {
  const {
    horizontal,
    display,
  } = props;

  return (
    <Flex direction={horizontal ? 'row' : 'col'} wrap className={clsx(
      'gap-1',
      horizontal ? 'items-center justify-end md:flex-row' : 'items-end justify-center',
    )}>
      <FadingLayout
        current={display}
        contents={{
          item: <PokemonProducingRateSingleAtItem {...props}/>,
          total: <PokemonProducingRateSingleAtTotal {...props}/>,
        }}
        className="place-items-end"
      />
    </Flex>
  );
};

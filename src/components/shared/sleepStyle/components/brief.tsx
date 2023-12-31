import React from 'react';

import {StarIcon} from '@heroicons/react/24/solid';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {useSleepStyleName} from '@/hooks/sleepdex/name';
import {PokemonId} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {SleepStyleCommon} from '@/types/game/sleepStyle';
import {Dimension} from '@/types/style';
import {Nullable} from '@/utils/type';


type Props<TSleepStyle extends SleepStyleCommon> = {
  pokemonId: PokemonId,
  pokemonBranch: Nullable<PokemonBranchData>,
  sleepStyle: TSleepStyle,
  className?: string,
  iconDimension?: Dimension,
  textShadow?: boolean,
};

export const SleepStyleBrief = <TSleepStyle extends SleepStyleCommon>({
  pokemonId,
  pokemonBranch,
  sleepStyle,
  className,
  iconDimension,
  textShadow,
}: Props<TSleepStyle>) => {
  const {rarity} = sleepStyle;
  const sleepStyleName = useSleepStyleName({
    pokemonId,
    pokemonBranch,
    sleepStyleId: sleepStyle.style,
  });

  return (
    <Flex direction="row" className={clsx('items-center gap-1.5 whitespace-nowrap', className)}>
      <Flex direction="row" noFullWidth className="items-center gap-0.5">
        <StarIcon className={iconDimension ?? 'h-5 w-5'}/>
        <div>{rarity}</div>
      </Flex>
      <div className={clsx('truncate', textShadow && 'text-shadow-preset')}>
        {sleepStyleName}
      </div>
    </Flex>
  );
};

import React from 'react';

import {clsx} from 'clsx';

import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {SleepdexStyleIcon} from '@/components/shared/sleepdex/styleIcon';
import {PokemonId} from '@/types/game/pokemon';
import {SleepStyleId} from '@/types/game/sleepStyle';
import {SleepdexCommonProps} from '@/ui/sleepStyle/sleepdex/type';
import {isInSleepdex} from '@/utils/game/sleepdex';


type Props = SleepdexCommonProps & {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
};

export const SleepdexPokemonSleepStyleButton = ({sleepdex, updateSleepdex, pokemonId, styleId}: Props) => {
  const className = clsx(
    'h-8 w-8 rounded-lg text-sm',
    getToggleButtonClass(isInSleepdex({sleepdex, pokemonId, styleId}) ?? false),
  );

  return (
    <button className={className} onClick={() => updateSleepdex({pokemonId, styleId})}>
      <Flex center>
        <SleepdexStyleIcon styleId={styleId}/>
      </Flex>
    </button>
  );
};

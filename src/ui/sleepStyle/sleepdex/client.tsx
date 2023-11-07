'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useUpdateSleepdex} from '@/hooks/sleepdex/update';
import {SleepdexUnlockedCount} from '@/ui/sleepStyle/sleepdex/count';
import {SleepdexOfSleepType} from '@/ui/sleepStyle/sleepdex/ofType/main';
import {SleepdexCommonProps, SleepdexDataProps} from '@/ui/sleepStyle/sleepdex/type';
import {toUnique} from '@/utils/array';


export const SleepdexClient = (props: SleepdexDataProps) => {
  const {
    pokemonList,
    sleepStyleMap,
    preloaded,
  } = props;

  const [sleepdex, setSleepdex] = React.useState(preloaded.sleepdex);
  const {
    uniqueSleepTypes,
    pokemonListOfSleepType,
  } = React.useMemo(() => {
    const uniqueSleepTypes = toUnique(pokemonList.map(({sleepType}) => sleepType));

    return {
      uniqueSleepTypes,
      pokemonListOfSleepType: Object.fromEntries(
        uniqueSleepTypes.map((sleepType) => [
          sleepType,
          pokemonList.filter((pokemon) => pokemon.sleepType === sleepType),
        ]),
      ),
    };
  }, []);
  const updateSleepdex = useUpdateSleepdex({sleepdex, setSleepdex});
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  const commonProps: SleepdexCommonProps = {
    ...props,
    sleepdex,
    updateSleepdex,
    showPokemon,
  };

  return (
    <Flex className="gap-2">
      <PokemonLinkPopup state={state} setState={setState}/>
      <SleepdexUnlockedCount sleepStyleMap={sleepStyleMap} sleepdex={sleepdex}/>
      {uniqueSleepTypes.map((sleepType) => (
        <SleepdexOfSleepType
          key={sleepType}
          {...commonProps}
          sleepType={sleepType}
          pokemonListOfSleepType={pokemonListOfSleepType[sleepType]}
        />
      ))}
    </Flex>
  );
};

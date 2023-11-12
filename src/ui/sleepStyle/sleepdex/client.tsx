'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {SleepdexSection} from '@/components/shared/sleepdex/section/main';
import {useUpdateSleepdex} from '@/hooks/sleepdex/update';
import {SleepdexUnlockedCount} from '@/ui/sleepStyle/sleepdex/count';
import {SleepdexDataProps} from '@/ui/sleepStyle/sleepdex/type';
import {toUnique} from '@/utils/array';
import {getAvailableSleepStylesFromNormal, getAvailableSleepStylesFromSpecial} from '@/utils/game/sleepdex';


export const SleepdexClient = (props: SleepdexDataProps) => {
  const {
    pokemonList,
    sleepStyleMap,
    sleepStyleSpecialMap,
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

  return (
    <Flex className="gap-2">
      <PokemonLinkPopup state={state} setState={setState}/>
      <SleepdexUnlockedCount
        sleepStyleMap={sleepStyleMap}
        sleepStyleSpecialMap={sleepStyleSpecialMap}
        sleepdex={sleepdex}
      />
      {uniqueSleepTypes.map((sleepType) => (
        <SleepdexSection
          key={sleepType}
          title={<PokemonSleepType sleepType={sleepType} className="invert-hoverable-dark"/>}
          sleepdex={sleepdex}
          updateSleepdex={updateSleepdex}
          showPokemon={showPokemon}
          pokemonListToShow={pokemonListOfSleepType[sleepType]}
          getSleepStylesFromPokemon={(pokemon) => toUnique([
            ...getAvailableSleepStylesFromNormal(sleepStyleMap[pokemon.id]),
            ...getAvailableSleepStylesFromSpecial(sleepStyleSpecialMap[pokemon.id]),
          ])}
          sleepStyleDependencies={[sleepStyleMap]}
        />
      ))}
    </Flex>
  );
};

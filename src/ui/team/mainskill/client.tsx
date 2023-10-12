'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonLevelSliderRow} from '@/components/shared/pokemon/level/sliderRow';
import {PokemonLab} from '@/components/shared/pokemon/predefined/lab/main';
import {useUserSettings} from '@/hooks/userData/settings';
import {SkillTriggerAnalysis} from '@/ui/team/mainskill/analysis/main';
import {
  SkillTriggerComparerDataProps,
  SkillTriggerComparerServerDataProps,
  SkillTriggerComparerState,
  SkillTriggerOnDeskState,
} from '@/ui/team/mainskill/type';
import {toSkillTriggerCompareUnit} from '@/ui/team/mainskill/utils';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon';
import {isNotNullish} from '@/utils/type';


export const SkillTriggerComparerClient = (props: SkillTriggerComparerServerDataProps) => {
  const {
    pokedexMap,
    pokemonMaxLevel,
    preloadedSettings,
  } = props;

  const {data: session} = useSession();
  const calculatedSettings = useUserSettings({
    server: preloadedSettings,
    client: session?.user.preloaded.settings,
  });
  const [state, setState] = React.useState<SkillTriggerComparerState>({
    ...calculatedSettings,
    base: null,
  });

  const pokemonList = Object.values(pokedexMap).filter(isNotNullish);
  const data: SkillTriggerComparerDataProps = {
    pokemonList,
    maxEvolutionCount: getPokemonMaxEvolutionCount(pokemonList),
    ...props,
  };

  return (
    <PokemonLab
      {...data}
      onPokemonPicked={(setup) => setState((original) => ({
        ...original,
        base: toSkillTriggerCompareUnit(setup),
      }))}
      onRun={(setup: SkillTriggerOnDeskState) => setState((original) => ({
        ...original,
        base: toSkillTriggerCompareUnit(setup),
      }))}
      toState={(onDeskState) => ({...onDeskState, level: 1})}
      immediateUpdate
      renderResult={({pokemon}) => (
        <SkillTriggerAnalysis
          {...data}
          initial={state}
          selectedPokemon={pokemon}
        />
      )}
      renderAdditional={({level}, setOnDesk) => (
        <PokemonLevelSliderRow
          level={level}
          maxLevel={pokemonMaxLevel}
          setLevel={(level) => setOnDesk((original) => ({...original, level}))}
        />
      )}
    />
  );
};

'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonLevelSliderRow} from '@/components/shared/pokemon/level/sliderRow';
import {PokemonLab} from '@/components/shared/pokemon/predefined/lab/main';
import {useUserSettings} from '@/hooks/userData/settings';
import {SkillTriggerAnalysisTargets} from '@/ui/team/mainskill/targets/main';
import {
  SkillTriggerAnalysisDataProps,
  SkillTriggerAnalysisServerDataProps,
  SkillTriggerAnalysisState,
  SkillTriggerOnDeskState,
} from '@/ui/team/mainskill/type';
import {toSkillTriggerAnalysisUnit} from '@/ui/team/mainskill/utils';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon';
import {isNotNullish} from '@/utils/type';


export const SkillTriggerAnalysisClient = (props: SkillTriggerAnalysisServerDataProps) => {
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
  const [state, setState] = React.useState<SkillTriggerAnalysisState>({
    ...calculatedSettings,
    base: null,
  });

  const pokemonList = Object.values(pokedexMap).filter(isNotNullish);
  const data: SkillTriggerAnalysisDataProps = {
    pokemonList,
    maxEvolutionCount: getPokemonMaxEvolutionCount(pokemonList),
    ...props,
  };

  return (
    <PokemonLab
      {...data}
      onPokemonPicked={(setup) => setState((original) => ({
        ...original,
        base: toSkillTriggerAnalysisUnit(setup),
      }))}
      onRun={(setup: SkillTriggerOnDeskState) => setState((original) => ({
        ...original,
        base: toSkillTriggerAnalysisUnit(setup),
      }))}
      toState={(onDeskState) => ({...onDeskState, level: 1})}
      immediateUpdate
      renderResult={({pokemon}) => (
        <SkillTriggerAnalysisTargets
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

'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonLevelSliderRow} from '@/components/shared/pokemon/level/sliderRow';
import {PokemonLab} from '@/components/shared/pokemon/predefined/lab/main';
import {useUserSettings} from '@/hooks/userData/settings/main';
import {useSkillTriggerAnalysisTargetState} from '@/ui/team/mainskill/state/hook';
import {SkillTriggerAnalysisTargets} from '@/ui/team/mainskill/targets/main';
import {
  SkillTriggerAnalysisDataProps,
  SkillTriggerAnalysisServerDataProps,
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
  const settings = useUserSettings({
    server: preloadedSettings,
    client: session?.user.preloaded.settings,
  });
  const stateControl = useSkillTriggerAnalysisTargetState();

  const {setBase} = stateControl;

  const pokemonList = Object.values(pokedexMap).filter(isNotNullish);
  const data: SkillTriggerAnalysisDataProps = {
    pokemonList,
    maxEvolutionCount: getPokemonMaxEvolutionCount(pokemonList),
    settings,
    ...props,
  };

  return (
    <PokemonLab
      {...data}
      onPokemonPicked={(setup) => setBase({
        unit: toSkillTriggerAnalysisUnit(setup),
        clearTarget: true,
      })}
      onRun={(setup: SkillTriggerOnDeskState) => setBase({
        unit: toSkillTriggerAnalysisUnit(setup),
        clearTarget: false,
      })}
      toState={(onDeskState) => ({...onDeskState, level: 1})}
      immediateUpdate
      renderResult={({pokemon}) => (
        <SkillTriggerAnalysisTargets
          {...data}
          selectedPokemon={pokemon}
          stateControl={stateControl}
        />
      )}
      renderAdditional={({level}, setOnDesk) => (
        <PokemonLevelSliderRow
          max={pokemonMaxLevel}
          value={level}
          setValue={(level) => setOnDesk((original) => ({...original, level}))}
        />
      )}
    />
  );
};

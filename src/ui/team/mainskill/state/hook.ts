import React from 'react';

import {v4} from 'uuid';

import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {UseSkillTriggerAnalysisTargetStateReturn} from '@/ui/team/mainskill/state/type';
import {SkillTriggerAnalysisState, SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';
import {generateSkillTriggerAnalysisUnit, GenerateSkillTriggerAnalysisUnitOpts} from '@/ui/team/mainskill/utils';


export const useSkillTriggerAnalysisTargetState = (): UseSkillTriggerAnalysisTargetStateReturn => {
  const [state, setState] = React.useState<SkillTriggerAnalysisState>({
    base: null,
    targets: {},
  });

  const funcDeps: React.DependencyList = [setState];

  const createUnit = React.useCallback((opts: GenerateSkillTriggerAnalysisUnitOpts) => {
    // `merge()` keeps the original value if the `update` is undefined, but `update` should overwrite it
    setState((original): SkillTriggerAnalysisState => ({
      ...original,
      targets: {
        ...original.targets,
        [v4()]: generateSkillTriggerAnalysisUnit(opts),
      },
    }));
  }, funcDeps);

  const createUnitDirect = React.useCallback((unit: SkillTriggerAnalysisUnit) => {
    // `merge()` keeps the original value if the `update` is undefined, but `update` should overwrite it
    setState((original): SkillTriggerAnalysisState => ({
      ...original,
      targets: {
        ...original.targets,
        [v4()]: unit,
      },
    }));
  }, funcDeps);

  const updateUnit = React.useCallback((id: string, update: Partial<PokemonConfigPokemonData>) => (
    // `merge()` keeps the original value if the `update` is undefined, but `update` should overwrite it
    setState((original): SkillTriggerAnalysisState => ({
      ...original,
      targets: {
        ...original.targets,
        [id]: {
          ...original.targets[id],
          ...update,
        },
      },
    }))
  ), funcDeps);

  const deleteUnit = React.useCallback((id: string) => {
    setState((original): SkillTriggerAnalysisState => ({
      ...original,
      targets: {
        ...original.targets,
        [id]: {
          ...original.targets[id],
          show: false,
        },
      },
    }));

    // Delaying the actual data deletion to let the deletion animation completes
    setTimeout(() => setState((original): SkillTriggerAnalysisState => {
      const updated = {...original};
      delete updated.targets[id];

      return updated;
    }), 1000);
  }, funcDeps);

  const copyUnit = React.useCallback((id: string) => {
    setState((original): SkillTriggerAnalysisState => ({
      ...original,
      targets: {
        ...original.targets,
        [v4()]: {...original.targets[id]},
      },
    }));
  }, funcDeps);

  return {
    state,
    setBase: ({unit, clearTarget}) => setState((original) => ({
      ...original,
      base: unit,
      targets: clearTarget ? {} : original.targets,
    })),
    createUnit,
    createUnitDirect,
    updateUnit,
    deleteUnit,
    copyUnit,
  };
};

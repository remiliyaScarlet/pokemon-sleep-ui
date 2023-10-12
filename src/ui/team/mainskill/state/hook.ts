import React from 'react';

import {v4} from 'uuid';

import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {UseSkillTriggerAnalysisTargetStateReturn} from '@/ui/team/mainskill/state/type';
import {SkillTriggerAnalysisState} from '@/ui/team/mainskill/type';
import {generateSkillTriggerAnalysisUnit, GenerateSkillTriggerAnalysisUnitOpts} from '@/ui/team/mainskill/utils';


type UseSkillTriggerAnalysisOpts = {
  calculatedSettings: CalculatedUserSettings,
};

export const useSkillTriggerAnalysisTargetState = ({
  calculatedSettings,
}: UseSkillTriggerAnalysisOpts): UseSkillTriggerAnalysisTargetStateReturn => {
  const [state, setState] = React.useState<SkillTriggerAnalysisState>({
    ...calculatedSettings,
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

  const deleteUnit = React.useCallback((id: string) => (
    setState((original): SkillTriggerAnalysisState => {
      const updated = {...original};
      delete updated.targets[id];

      return updated;
    })
  ), funcDeps);

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
    setBase: (base) => setState((original) => ({
      ...original,
      base,
    })),
    createUnit,
    updateUnit,
    deleteUnit,
    copyUnit,
  };
};

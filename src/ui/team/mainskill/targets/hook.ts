import React from 'react';

import {v4} from 'uuid';

import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {SkillTriggerAnalysisTargetsState} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisState} from '@/ui/team/mainskill/type';
import {generateSkillTriggerAnalysisUnit, GenerateSkillTriggerAnalysisUnitOpts} from '@/ui/team/mainskill/utils';


type UseSkillTriggerAnalysisOpts = {
  initial: SkillTriggerAnalysisState,
};

export const useSkillTriggerAnalysisTargets = ({initial}: UseSkillTriggerAnalysisOpts) => {
  const [state, setState] = React.useState<SkillTriggerAnalysisTargetsState>({
    ...initial,
    targets: {},
  });

  const targetBottomRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => targetBottomRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});

  const createUnit = React.useCallback((opts: GenerateSkillTriggerAnalysisUnitOpts) => {
    // `merge()` keeps the original value if the `update` is undefined, but `update` should overwrite it
    setState((original): SkillTriggerAnalysisTargetsState => ({
      ...original,
      targets: {
        ...original.targets,
        [v4()]: generateSkillTriggerAnalysisUnit(opts),
      },
    }));
    scrollToBottom();
  }, [setState]);

  const updateUnit = React.useCallback((id: string, update: Partial<PokemonConfigPokemonData>) => (
    // `merge()` keeps the original value if the `update` is undefined, but `update` should overwrite it
    setState((original): SkillTriggerAnalysisTargetsState => ({
      ...original,
      targets: {
        ...original.targets,
        [id]: {
          ...original.targets[id],
          ...update,
        },
      },
    }))
  ), [setState]);

  const deleteUnit = React.useCallback((id: string) => (
    setState((original): SkillTriggerAnalysisTargetsState => {
      const updated = {...original};
      delete updated.targets[id];

      return updated;
    })
  ), [setState]);

  const copyUnit = React.useCallback((id: string) => {
    setState((original): SkillTriggerAnalysisTargetsState => ({
      ...original,
      targets: {
        ...original.targets,
        [v4()]: {...original.targets[id]},
      },
    }));
    scrollToBottom();
  }, [setState]);

  // If `initial` changes, reset the comparison targets
  React.useEffect(() => setState({...initial, targets: {}}), [initial]);

  return {targetBottomRef, state, createUnit, updateUnit, deleteUnit, copyUnit};
};

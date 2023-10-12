import React from 'react';

import {v4} from 'uuid';

import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {SkillTriggerAnalysisState} from '@/ui/team/mainskill/analysis/type';
import {SkillTriggerComparerState} from '@/ui/team/mainskill/type';
import {generateSkillTriggerCompareUnit, GenerateSkillTriggerCompareUnitOpts} from '@/ui/team/mainskill/utils';


type UseSkillTriggerAnalysisOpts = {
  initial: SkillTriggerComparerState,
};

export const useSkillTriggerAnalysis = ({initial}: UseSkillTriggerAnalysisOpts) => {
  const [state, setState] = React.useState<SkillTriggerAnalysisState>({
    ...initial,
    targets: {},
  });

  const analysisBottomRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => analysisBottomRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});

  const createUnit = React.useCallback((opts: GenerateSkillTriggerCompareUnitOpts) => {
    const id = v4();

    // `merge()` keeps the original value if the `update` is undefined, but `update` should overwrite it
    setState((original): SkillTriggerAnalysisState => ({
      ...original,
      targets: {
        ...original.targets,
        [id]: generateSkillTriggerCompareUnit(opts),
      },
    }));
    scrollToBottom();
  }, [setState]);

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
  ), [setState]);

  const deleteUnit = React.useCallback((id: string) => (
    setState((original): SkillTriggerAnalysisState => {
      const updated = {...original};
      delete updated.targets[id];

      return updated;
    })
  ), [setState]);

  // If `initial` changes, reset the comparison targets
  React.useEffect(() => setState({...initial, targets: {}}), [initial]);

  return {analysisBottomRef, state, createUnit, updateUnit, deleteUnit};
};

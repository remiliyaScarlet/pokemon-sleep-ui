import React from 'react';

import {useWorker} from '@/hooks/worker';
import {GetTeamMakerCalcPrepOpts, GetTeamMakerResultsOpts} from '@/ui/team/maker/hook/type';
import {TeamMakerResult, TeamMakerState} from '@/ui/team/maker/type';
import {getCombinationCount} from '@/utils/compute';


export const useTeamMaker = () => {
  const [state, setState] = React.useState<TeamMakerState>({
    loading: false,
    results: [],
    combinations: null,
    calcFinalOpts: null,
  });
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const {work: workPrep} = useWorker<GetTeamMakerCalcPrepOpts, GetTeamMakerResultsOpts>({
    workerName: 'Team Maker (Prep)',
    generateWorker: () => new Worker(new URL('prep.worker', import.meta.url)),
    onCompleted: (calcFinalOpts) => {
      const {candidates, input} = calcFinalOpts;

      setState({
        // Still loading as `Team Maker (Final)` should be triggered later
        loading: true,
        results: [],
        combinations: getCombinationCount(candidates.length, input.memberCount),
        calcFinalOpts,
      });
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 250);
    },
    onError: () => setState({
      loading: false,
      results: [],
      combinations: null,
      calcFinalOpts: null,
    }),
  });
  const {work: workFinal} = useWorker<GetTeamMakerResultsOpts, TeamMakerResult[]>({
    workerName: 'Team Maker (Final)',
    generateWorker: () => new Worker(new URL('final.worker', import.meta.url)),
    onCompleted: (results) => {
      setState((original) => ({
        ...original,
        loading: false,
        results,
        calcFinalOpts: null,
      }));
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 250);
    },
    onError: () => setState((original) => ({
      ...original,
      loading: false,
      results: [],
      calcFinalOpts: null,
    })),
  });

  const calculateTeam = React.useCallback((opts: GetTeamMakerCalcPrepOpts) => {
    setState({
      loading: true,
      results: [],
      combinations: null,
      calcFinalOpts: null,
    });
    workPrep(opts);
  }, [workPrep, workFinal]);

  React.useEffect(() => {
    if (!state.calcFinalOpts) {
      return;
    }

    workFinal(state.calcFinalOpts);
  }, [state]);

  return {state, calculateTeam, resultsRef};
};

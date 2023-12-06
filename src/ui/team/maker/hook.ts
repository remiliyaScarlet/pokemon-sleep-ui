import React from 'react';

import {useWorker} from '@/hooks/worker';
import {GetTeamMakerResultsOpts} from '@/ui/team/maker/calc/type';
import {TeamMakerResult, TeamMakerState} from '@/ui/team/maker/type';


export const useTeamMaker = () => {
  const [state, setState] = React.useState<TeamMakerState>({
    loading: false,
    results: [],
  });
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const {work} = useWorker<GetTeamMakerResultsOpts, TeamMakerResult[]>({
    workerName: 'Team Maker',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (results) => {
      setState({
        loading: false,
        results,
      });
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 250);
    },
    onError: () => setState({
      loading: false,
      results: [],
    }),
  });

  const calculateTeam = React.useCallback((opts: GetTeamMakerResultsOpts) => {
    setState({
      loading: true,
      results: [],
    });
    work(opts);
  }, [work]);

  return {state, calculateTeam, resultsRef};
};

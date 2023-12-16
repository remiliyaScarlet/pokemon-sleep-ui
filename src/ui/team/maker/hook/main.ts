import React from 'react';

import {useWorker} from '@/hooks/worker';
import {reduceTeamMakerResultComp} from '@/ui/team/maker/calc/utils';
import {teamMakerCalcCompSegmentSize} from '@/ui/team/maker/const';
import {
  TeamMakerCalcGenerateCompOpts,
  TeamMakerCalcGenerateCompReturn,
  TeamMakerCalcInitOpts,
  TeamMakerCalcInitReturn,
  TeamMakerCalcResultsOpts,
} from '@/ui/team/maker/type/calc';
import {TeamMakerResult} from '@/ui/team/maker/type/result';
import {TeamMakerState} from '@/ui/team/maker/type/state';
import {getCombinationCount} from '@/utils/compute';


export const useTeamMaker = () => {
  const [state, setState] = React.useState<TeamMakerState>({
    status: 'standby',
    result: null,
    teamCompsCalculated: null,
    teamCompsTotal: null,
  });
  const resultsRef = React.useRef<HTMLButtonElement>(null);

  const {work: workInit} = useWorker<TeamMakerCalcInitOpts, TeamMakerCalcInitReturn>({
    workerName: 'Team Maker (Initial)',
    generateWorker: () => new Worker(new URL('init.worker', import.meta.url)),
    onCompleted: (calcGenCompOpts) => {
      const {candidates, input} = calcGenCompOpts;

      setState({
        status: 'generatingTeams',
        result: null,
        teamCompsCalculated: null,
        teamCompsTotal: getCombinationCount(candidates.length, input.memberCount),
      });

      workGenComp(calcGenCompOpts);
    },
    onError: () => setState({
      status: 'error',
      result: null,
      teamCompsCalculated: null,
      teamCompsTotal: null,
    }),
  });

  const {work: workGenComp} = useWorker<TeamMakerCalcGenerateCompOpts, TeamMakerCalcGenerateCompReturn>({
    workerName: 'Team Maker (Generate Comp)',
    generateWorker: () => new Worker(new URL('generateComp.worker', import.meta.url)),
    onCompleted: ({allPossibleTeamComps, ...calcResultOpts}) => {
      setState(({teamCompsTotal}): TeamMakerState => ({
        status: 'calculating',
        result: null,
        teamCompsCalculated: 0,
        teamCompsTotal: teamCompsTotal ?? NaN,
      }));

      for (let i = 0; i < allPossibleTeamComps.length; i += teamMakerCalcCompSegmentSize) {
        workFinal({
          ...calcResultOpts,
          teamComps: allPossibleTeamComps.slice(i, i + teamMakerCalcCompSegmentSize),
        });
      }
    },
    onError: () => setState({
      status: 'error',
      result: null,
      teamCompsCalculated: null,
      teamCompsTotal: null,
    }),
  });

  const {work: workFinal} = useWorker<TeamMakerCalcResultsOpts, TeamMakerResult>({
    workerName: 'Team Maker (Final)',
    generateWorker: () => new Worker(new URL('final.worker', import.meta.url)),
    onCompleted: (result) => setState((original): TeamMakerState => {
      let {teamCompsCalculated, teamCompsTotal} = original;
      if (teamCompsCalculated === null || teamCompsTotal === null) {
        return {
          status: 'error',
          result: null,
          teamCompsCalculated: null,
          teamCompsTotal: null,
        };
      }

      teamCompsCalculated = Math.min(teamCompsCalculated + teamMakerCalcCompSegmentSize, teamCompsTotal);
      const isCompleted = teamCompsCalculated >= teamCompsTotal;

      if (isCompleted) {
        // A small timeout is needed to allow team comps to complete rendering before scrolling
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 250);
      }

      return {
        status: isCompleted ? 'completed' : 'calculating',
        result: {
          ...result,
          comps: reduceTeamMakerResultComp([...(original.result?.comps ?? []), ...result.comps]),
        },
        teamCompsCalculated,
        teamCompsTotal,
      };
    }),
    onError: () => setState({
      status: 'error',
      result: null,
      teamCompsCalculated: null,
      teamCompsTotal: null,
    }),
  });

  const calculateTeam = React.useCallback((opts: TeamMakerCalcInitOpts) => {
    setState({
      status: 'initializing',
      result: null,
      teamCompsCalculated: null,
      teamCompsTotal: null,
    });
    workInit(opts);
  }, [workInit, workFinal]);

  return {state, calculateTeam, resultsRef};
};

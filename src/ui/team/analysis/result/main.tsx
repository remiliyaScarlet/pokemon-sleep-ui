import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {useProducingStats} from '@/ui/team/analysis/result/hook';
import {TeamAnalysisPokemon} from '@/ui/team/analysis/result/pokemon/main';
import {TeamAnalysisGroupedSummary} from '@/ui/team/analysis/result/summary/grouped/main';
import {TeamAnalysisSummary} from '@/ui/team/analysis/result/summary/main';
import {
  TeamAnalysisDataProps,
  TeamAnalysisFilter,
  TeamAnalysisMember,
  TeamAnalysisSlotName,
  teamAnalysisSlotName,
  TeamAnalysisTeamSetup,
} from '@/ui/team/analysis/type';
import {classNames} from '@/utils/react';


type Props = TeamAnalysisDataProps & {
  setup: TeamAnalysisTeamSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisTeamSetup>>,
  snorlaxFavorite: TeamAnalysisFilter['snorlaxFavorite'],
};

export const TeamAnalysis = (props: Props) => {
  const {
    setup,
    setSetup,
    pokedex,
    berryMap,
    snorlaxRankData,
  } = props;

  const producingStats = useProducingStats(props);

  const setTeamMember = React.useCallback((slotName: TeamAnalysisSlotName, update: Partial<TeamAnalysisMember>) => {
    setSetup((original) => ({
      ...original,
      team: {
        ...original.team,
        [slotName]: {
          ...original.team[slotName],
          ...update,
        },
      },
    }));
  }, [setSetup]);

  return (
    <Flex direction="row" center wrap className="gap-1.5">
      {teamAnalysisSlotName.map((slotName) => {
        const member = setup.team[slotName];
        const pokemon = member ? pokedex[member.pokemonId] : undefined;
        const stats = producingStats.bySlot[slotName];

        const isAvailable = member && pokemon && stats;

        return (
          <Flex key={slotName} direction="col" center className={classNames(
            'relative button-bg h-[30rem] rounded-lg p-3 gap-1.5',
            'width-with-gap-sm width-with-gap-2-items md:width-with-gap-3-items lg:width-with-gap-5-items',
          )}>
            <button
              className="button-clickable disabled:button-disabled-border absolute right-1 top-1 h-5 w-5 rounded-full"
              disabled={!member}
              onClick={() => setSetup((original) => ({
                ...original,
                team: {
                  ...original.team,
                  [slotName]: null,
                },
              }))}
            >
              <XMarkIcon/>
            </button>
            {isAvailable &&
              <Link
                href={`/pokedex/${pokemon?.id}`}
                className="button-clickable absolute left-1 top-1 h-5 w-5 rounded-full"
              >
                <InformationCircleIcon/>
              </Link>}
            {isAvailable ?
              <TeamAnalysisPokemon
                key={slotName} member={member} producingStats={stats} slotName={slotName}
                setLevel={(level) => setTeamMember(slotName, {level})}
                setNature={(nature) => setTeamMember(slotName, {nature})}
                pokemon={pokemon} berryMap={berryMap}
              /> :
              <UnavailableIcon/>}
          </Flex>
        );
      })}
      <TeamAnalysisGroupedSummary grouped={producingStats.grouped}/>
      <TeamAnalysisSummary
        bonus={setup.bonus}
        setBonus={(bonus) => setSetup((original) => ({
          ...original,
          bonus,
        }))}
        stats={producingStats}
        snorlaxRankData={snorlaxRankData}
      />
    </Flex>
  );
};

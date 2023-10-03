import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {TeamAnalysisEmptySlot} from '@/ui/team/analysis/setup/team/empty';
import {TeamAnalysisFilledSlot} from '@/ui/team/analysis/setup/team/filled';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {toTeamAnalysisMember} from '@/ui/team/analysis/setup/team/utils';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps, TeamAnalysisSetup, teamAnalysisSlotName} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';


type Props = TeamAnalysisDataProps & TeamAnalysisFilledProps & {
  statsOfTeam: TeamProducingStats,
};

export const TeamAnalysisTeamView = (props: Props) => {
  const {
    setup,
    setSetup,
    pokedex,
    pokemonProducingParamsMap,
    statsOfTeam,
  } = props;

  const currentTeam = getCurrentTeam({setup});

  return (
    <Grid className="grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {teamAnalysisSlotName.map((slotName) => {
        const member = currentTeam.members[slotName];
        const pokemon = member ? pokedex[member.pokemonId] : undefined;
        const stats = statsOfTeam.bySlot[slotName];

        const isAvailable = member && pokemon && stats;

        return (
          <Flex key={slotName} direction="col" center className={clsx(
            'button-bg relative gap-1.5 rounded-lg p-3',
          )}>
            <button
              className={clsx(
                'absolute right-1 top-1 z-10 h-5 w-5 rounded-full',
                'enabled:button-clickable disabled:button-disabled-border',
              )}
              disabled={!member}
              onClick={() => setSetup((original) => ({
                ...original,
                teams: {
                  ...original.teams,
                  [original.current]: getCurrentTeam({
                    setup: original,
                    overrideSlot: slotName,
                    overrideMember: null,
                  }),
                },
              }))}
            >
              <XMarkIcon/>
            </button>
            {isAvailable ?
              <TeamAnalysisFilledSlot
                {...props}
                slotName={slotName}
                member={member}
                stats={stats}
                pokemon={pokemon}
                pokemonProducingParams={getPokemonProducingParams({
                  pokemonId: pokemon.id,
                  pokemonProducingParamsMap,
                })}
              /> :
              <TeamAnalysisEmptySlot
                {...props}
                onPokeboxPicked={(member) => setSetup((original): TeamAnalysisSetup => ({
                  ...original,
                  teams: {
                    ...original.teams,
                    [original.current]: getCurrentTeam({
                      setup: original,
                      overrideSlot: slotName,
                      overrideMember: toTeamAnalysisMember(member),
                    }),
                  },
                }))}
              />}
          </Flex>
        );
      })}
    </Grid>
  );
};

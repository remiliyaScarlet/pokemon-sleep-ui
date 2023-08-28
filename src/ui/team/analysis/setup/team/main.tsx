import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {PokemonInfo} from '@/types/game/pokemon';
import {TeamAnalysisEmptySlot} from '@/ui/team/analysis/setup/team/empty';
import {TeamAnalysisFilledSlot} from '@/ui/team/analysis/setup/team/filled';
import {toTeamAnalysisMember} from '@/ui/team/analysis/setup/team/utils';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps, teamAnalysisSlotName, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


type Props = TeamAnalysisDataProps & {
  setup: TeamAnalysisTeamSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisTeamSetup>>,
  producingStats: TeamProducingStats,
  showPokemon: (pokemon: PokemonInfo) => void,
};

export const TeamAnalysisTeamView = (props: Props) => {
  const {
    setup,
    setSetup,
    pokedex,
    producingStats,
  } = props;

  return (
    <Grid className="grid-cols-1 gap-1.5 md:grid-cols-3 lg:grid-cols-5">
      {teamAnalysisSlotName.map((slotName) => {
        const member = setup.team[slotName];
        const pokemon = member ? pokedex[member.pokemonId] : undefined;
        const stats = producingStats.bySlot[slotName];

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
                team: {
                  ...original.team,
                  [slotName]: null,
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
              /> :
              <TeamAnalysisEmptySlot
                {...props}
                onPokeboxPicked={(member) => setSetup((original): TeamAnalysisTeamSetup => ({
                  ...original,
                  team: {
                    ...original.team,
                    [slotName]: toTeamAnalysisMember(member),
                  },
                }))}
              />}
          </Flex>
        );
      })}
    </Grid>
  );
};

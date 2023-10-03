import React from 'react';

import {v4} from 'uuid';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {UserSettings} from '@/types/userData/settings';
import {useTeamAnalysisPokemonFilter} from '@/ui/team/analysis/hook';
import {TeamAnalysisPokemonFilter} from '@/ui/team/analysis/input/main';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {TeamAnalysisDataProps, TeamAnalysisSetup} from '@/ui/team/analysis/type';
import {generateEmptyTeam, getCurrentTeam} from '@/ui/team/analysis/utils';
import {migrate} from '@/utils/migrate/main';
import {teamAnalysisSetupMigrators} from '@/utils/migrate/teamAnalysisSetup/migrators';
import {DeepPartial, isNotNullish} from '@/utils/type';


type Props = TeamAnalysisDataProps & {
  settings: DeepPartial<UserSettings> | undefined,
};

export const TeamAnalysisLoadedClient = (props: Props) => {
  const {
    pokedex,
    preloadedSetup,
    ingredientChainMap,
  } = props;
  const pokemon = Object.values(pokedex).filter(isNotNullish);

  const initialSetup = React.useMemo(() => {
    // Migrate first for older data version
    // If the user is not logged in or new, they won't have `preloadedSetup` so they need an initial comp
    // Therefore generate the initial comp for migration, then remove it if it's not needed
    const initialCompUuid = v4();

    const migrated = migrate({
      original: {
        current: initialCompUuid,
        teams: {
          [initialCompUuid]: generateEmptyTeam(initialCompUuid),
        },
        version: 5,
      },
      override: preloadedSetup ?? null,
      migrators: teamAnalysisSetupMigrators,
      migrateParams: {pokedex, ingredientChainMap},
    });

    if (migrated.current !== initialCompUuid) {
      delete migrated.teams[initialCompUuid];
    }

    return migrated;
  }, []);
  const [setup, setSetup] = React.useState<TeamAnalysisSetup>(initialSetup);
  const currentTeam = getCurrentTeam({setup});
  const {filter, setFilter, isIncluded} = useTeamAnalysisPokemonFilter({
    data: pokemon,
    snorlaxFavorite: currentTeam.snorlaxFavorite,
    ...props,
  });

  return (
    <>
      <TeamAnalysisPokemonFilter
        pokemonList={pokemon}
        setup={setup}
        setSetup={setSetup}
        isIncluded={isIncluded}
        filter={filter}
        setFilter={setFilter}
        {...props}
      />
      <AdsUnit/>
      <Flex className="gap-1">
        <SnorlaxFavoriteInput
          filter={currentTeam}
          setFilter={(getUpdatedTeam) => setSetup((original) => {
            const updated = getUpdatedTeam(getCurrentTeam({setup: original}));

            return {
              ...original,
              teams: {
                ...original.teams,
                [updated.uuid]: updated,
              },
            };
          })}
          filterKey="snorlaxFavorite"
          pokemonList={pokemon}
          {...props}
        />
      </Flex>
      <TeamAnalysisSetupView
        setup={setup}
        setSetup={setSetup}
        snorlaxFavorite={currentTeam.snorlaxFavorite}
        {...props}
      />
    </>
  );
};

import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useProducingStats} from '@/ui/team/analysis/result/hook';
import {TeamAnalysisPokemon} from '@/ui/team/analysis/result/pokemon/main';
import {TeamAnalysisGroupedSummary} from '@/ui/team/analysis/result/summary/grouped/main';
import {TeamAnalysisSummary} from '@/ui/team/analysis/result/summary/main';
import {TeamAnalysisUploadSetup} from '@/ui/team/analysis/result/upload';
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
    subSkillMap,
    snorlaxRankData,
    snorlaxFavorite,
  } = props;

  const t = useTranslations('UI.Metadata.Pokedex');
  const t2 = useTranslations('Game.PokemonName');
  const producingStats = useProducingStats(props);
  const {state, setState, showPokemon} = usePokemonLinkPopup();

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
    } satisfies TeamAnalysisTeamSetup));
  }, [setSetup]);

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <Flex direction="row" center wrap className="gap-1.5">
        {teamAnalysisSlotName.map((slotName) => {
          const member = setup.team[slotName];
          const pokemon = member ? pokedex[member.pokemonId] : undefined;
          const stats = producingStats.bySlot[slotName];

          const isAvailable = member && pokemon && stats;

          return (
            <Flex key={slotName} direction="col" center className={classNames(
              'relative button-bg h-[33rem] rounded-lg p-3 gap-1.5',
              'width-with-gap-sm width-with-gap-2-items md:width-with-gap-3-items lg:width-with-gap-5-items',
            )}>
              <button
                className={classNames(
                  'absolute right-1 top-1 h-5 w-5 rounded-full',
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
              {isAvailable &&
                <button
                  className="button-clickable group absolute left-1 top-1 h-6 w-6 rounded-full"
                  onClick={() => showPokemon(pokemon)}
                >
                  <GenericPokeballIcon alt={t('Page.Title', {name: t2(pokemon.id.toString())})} noWrap/>
                </button>}
              {isAvailable ?
                <TeamAnalysisPokemon
                  key={slotName}
                  slotName={slotName}
                  member={member}
                  producingStats={stats}
                  setLevel={(level) => setTeamMember(slotName, {level})}
                  setNature={(nature) => setTeamMember(slotName, {nature})}
                  setSubSkill={(subSkill) => setTeamMember(slotName, {subSkill})}
                  pokemon={pokemon}
                  berryMap={berryMap}
                  subSkillMap={subSkillMap}
                /> :
                <UnavailableIcon/>}
            </Flex>
          );
        })}
        <TeamAnalysisUploadSetup setup={setup} snorlaxFavorite={snorlaxFavorite}/>
        <AdsUnit/>
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
        <AdsUnit/>
      </Flex>
    </>
  );
};

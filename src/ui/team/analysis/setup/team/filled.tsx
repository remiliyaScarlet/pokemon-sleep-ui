import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {TeamAnalysisPokemon} from '@/ui/team/analysis/setup/pokemon/main';
import {TeamProducingStatsSingle} from '@/ui/team/analysis/setup/type';
import {
  TeamAnalysisDataProps,
  TeamAnalysisMember,
  TeamAnalysisSlotName,
  TeamAnalysisTeamSetup,
} from '@/ui/team/analysis/type';


type Props = Pick<TeamAnalysisDataProps, 'berryMap' | 'subSkillMap'> & {
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisTeamSetup>>,
  slotName: TeamAnalysisSlotName,
  member: TeamAnalysisMember,
  stats: TeamProducingStatsSingle,
  pokemon: PokemonInfo,
  showPokemon: (pokemon: PokemonInfo) => void,
};

export const TeamAnalysisFilledSlot = ({
  berryMap,
  subSkillMap,
  setSetup,
  slotName,
  member,
  stats,
  pokemon,
  showPokemon,
}: Props) => {
  const t = useTranslations('UI.Metadata.Pokedex');
  const t2 = useTranslations('Game.PokemonName');

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
      <button
        className="button-clickable group absolute left-1 top-1 h-6 w-6 rounded-full"
        onClick={() => showPokemon(pokemon)}
      >
        <GenericPokeballIcon alt={t('Page.Title', {name: t2(pokemon.id.toString())})} noWrap/>
      </button>
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
      />
    </>
  );
};

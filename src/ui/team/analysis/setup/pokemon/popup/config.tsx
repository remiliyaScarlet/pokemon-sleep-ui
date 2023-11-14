import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIntentionalFullPackInput} from '@/components/shared/pokemon/fullPack/input';
import {PokemonConfig} from '@/components/shared/pokemon/predefined/config/main';
import {SeedUsageInput} from '@/components/shared/pokemon/seed/input/main';
import {defaultSeedUsage} from '@/const/game/seed';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {getSubSkillBonus} from '@/utils/game/subSkill/effect';


export const TeamAnalysisPokemonMemberConfig = (props: TeamAnalysisPokemonProps) => {
  const {
    slotName,
    member,
    setMember,
    subSkillMap,
  } = props;

  const {
    level,
    subSkill,
  } = member;

  const t = useTranslations('UI.UserSettings');

  const seeds = member.seeds ?? defaultSeedUsage;
  const alwaysFullPack = member.alwaysFullPack ?? null;

  return (
    <Flex noFullWidth className="gap-1.5 sm:w-[60vw]">
      <PokemonConfig
        {...props}
        data={member}
        onDataUpdated={(update) => setMember(slotName, update)}
        idPrefix="teamAnalysis"
      />
      <SeedUsageInput
        idPrefix="teamAnalysis"
        usage={seeds}
        setUsage={(getUpdated) => setMember(slotName, {seeds: getUpdated(seeds)})}
        evolutionCount={member.evolutionCount}
        subSkillBonus={getSubSkillBonus({level, pokemonSubSkill: subSkill, subSkillMap})}
      />
      <PokemonIntentionalFullPackInput
        idPrefix="teamAnalysis"
        title={t('AlwaysFullPack')}
        alwaysFullPack={alwaysFullPack}
        setAlwaysFullPack={(berryPokemonAlwaysFullPack) => (
          setMember(slotName, {alwaysFullPack: berryPokemonAlwaysFullPack})
        )}
      />
    </Flex>
  );
};

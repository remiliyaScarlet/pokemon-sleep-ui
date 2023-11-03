import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIntentionalFullPackInput} from '@/components/shared/pokemon/fullPack/input';
import {PokemonConfig} from '@/components/shared/pokemon/predefined/config/main';
import {SeedUsageInput} from '@/components/shared/pokemon/seed/input/main';
import {defaultSeedUsage} from '@/const/game/seed';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';


export const TeamAnalysisPokemonMemberConfig = (props: TeamAnalysisPokemonProps) => {
  const {
    slotName,
    member,
    setMember,
  } = props;

  const t = useTranslations('UI.UserSettings');

  const seeds = member.seeds ?? defaultSeedUsage;
  const alwaysFullPack = member.berryPokemonAlwaysFullPack ?? null;

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
      />
      <PokemonIntentionalFullPackInput
        idPrefix="teamAnalysis"
        title={t('BerryPokemonFullPack')}
        alwaysFullPack={alwaysFullPack}
        setAlwaysFullPack={(berryPokemonAlwaysFullPack) => (
          setMember(slotName, {berryPokemonAlwaysFullPack})
        )}
      />
    </Flex>
  );
};

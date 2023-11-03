import React from 'react';

import {Flex} from '@/components/layout/flex/common';
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

  const seeds = member.seeds ?? defaultSeedUsage;

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
    </Flex>
  );
};

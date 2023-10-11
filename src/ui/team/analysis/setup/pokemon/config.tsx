import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonConfig} from '@/components/shared/pokemon/predefined/config/main';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';


export const TeamAnalysisPokemonMemberConfig = (props: TeamAnalysisPokemonProps) => {
  const {
    slotName,
    member,
    setMember,
  } = props;

  return (
    <Flex noFullWidth className="sm:w-[60vw]">
      <PokemonConfig
        {...props}
        data={member}
        onDataUpdated={(update) => setMember(slotName, update)}
      />
    </Flex>
  );
};

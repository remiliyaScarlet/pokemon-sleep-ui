import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonEvolutionCountInput} from '@/components/shared/pokemon/evolution/countInput';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';


export const TeamAnalysisPokemonIndividualParams = (props: TeamAnalysisPokemonProps) => {
  const {
    slotName,
    pokemon,
    member,
    setMember,
    berryDataMap,
    subSkillMap,
    maxEvolutionCount,
  } = props;

  const {berry} = pokemon;
  const berryData = berryDataMap[berry.id];
  const maxLevel = berryData.energy.length;

  return (
    <>
      <Flex className="h-14 gap-1.5">
        <PokemonNatureSelector
          nature={member.nature}
          setNature={(nature) => setMember(slotName, {nature})}
          hideName
        />
        <PokemonSubSkillSelector
          subSkill={member.subSkill}
          setSubSkill={(subSkill) => setMember(slotName, {subSkill})}
          subSkillMap={subSkillMap}
        />
      </Flex>
      <PokemonLevelSlider
        level={member.level}
        setLevel={(level) => setMember(slotName, {level})}
        maxLevel={maxLevel}
        noSameLine
      />
      <PokemonEvolutionCountInput
        idPrefix="TeamAnalysis"
        evolutionCount={member.evolutionCount}
        setEvolutionCount={(evolutionCount) => setMember(slotName, {evolutionCount})}
        maxEvolutionCount={maxEvolutionCount}
      />
    </>
  );
};

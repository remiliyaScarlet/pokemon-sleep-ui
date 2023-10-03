import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonEvolutionCountInput} from '@/components/shared/pokemon/evolution/countInput';
import {PokemonEvolutionSelector} from '@/components/shared/pokemon/evolution/selector';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';


export const TeamAnalysisPokemonMemberConfig = (props: TeamAnalysisPokemonProps) => {
  const {
    slotName,
    pokemon,
    member,
    setMember,
    pokedex,
    ingredientChainMap,
    berryDataMap,
    subSkillMap,
    maxEvolutionCount,
  } = props;

  const {id, berry, ingredientChain} = pokemon;
  const berryData = berryDataMap[berry.id];
  const maxLevel = berryData.energy.length;

  return (
    <Flex noFullWidth className="gap-1.5 sm:w-[60vw]">
      <PokemonEvolutionSelector
        pokemon={pokemon}
        pokedex={pokedex}
        onClick={(pokemonId) => setMember(slotName, {pokemonId})}
      />
      <PokemonIngredientPicker
        chain={ingredientChainMap[ingredientChain]}
        ingredients={member.ingredients}
        onSelect={(updated, ingredientLevel) => setMember(
          slotName,
          {
            ...member,
            ingredients: {
              ...member.ingredients,
              [ingredientLevel]: updated,
            },
          },
        )}
        idPrefix={id.toString()}
      />
      <Flex className="h-20 gap-1.5">
        <PokemonNatureSelector
          nature={member.nature}
          setNature={(nature) => setMember(slotName, {nature})}
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
    </Flex>
  );
};

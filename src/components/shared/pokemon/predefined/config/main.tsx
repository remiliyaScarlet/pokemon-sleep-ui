import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonEvolutionCountInput} from '@/components/shared/pokemon/evolution/countInput';
import {PokemonEvolutionSelector} from '@/components/shared/pokemon/evolution/selector';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonConfigProps} from '@/components/shared/pokemon/predefined/config/type';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';


export const PokemonConfig = (props: PokemonConfigProps) => {
  const {
    data,
    onDataUpdated,
    pokemon,
    pokedexMap,
    ingredientChainMap,
    pokemonMaxLevel,
    subSkillMap,
    maxEvolutionCount,
    idPrefix,
  } = props;

  const {ingredientChain} = pokemon;

  return (
    <Flex className="gap-1.5">
      <PokemonEvolutionSelector
        pokemon={pokemon}
        pokedex={pokedexMap}
        onClick={(pokemonId) => onDataUpdated({pokemonId})}
      />
      <PokemonIngredientPicker
        chain={ingredientChainMap[ingredientChain]}
        ingredients={data.ingredients}
        onSelect={(updated, ingredientLevel) => onDataUpdated({
          ...data,
          ingredients: {
            ...data.ingredients,
            [ingredientLevel]: updated,
          },
        })}
        idPrefix={idPrefix}
      />
      <Flex className="h-20 gap-1.5">
        <PokemonNatureSelector
          nature={data.nature}
          setNature={(nature) => onDataUpdated({nature})}
        />
        <PokemonSubSkillSelector
          subSkill={data.subSkill}
          setSubSkill={(subSkill) => onDataUpdated({subSkill})}
          subSkillMap={subSkillMap}
        />
      </Flex>
      <PokemonLevelSlider
        level={data.level}
        setLevel={(level) => onDataUpdated({level})}
        maxLevel={pokemonMaxLevel}
        noSameLine
      />
      <PokemonEvolutionCountInput
        evolutionCount={data.evolutionCount}
        setEvolutionCount={(evolutionCount) => onDataUpdated({evolutionCount})}
        maxEvolutionCount={maxEvolutionCount}
        idPrefix={idPrefix}
      />
    </Flex>
  );
};

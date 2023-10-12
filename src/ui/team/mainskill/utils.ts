import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {SkillTriggerCompareUnit, SkillTriggerOnDeskState} from '@/ui/team/mainskill/type';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


export const toSkillTriggerCompareUnit = ({pokemon, ...data}: SkillTriggerOnDeskState): SkillTriggerCompareUnit => {
  return {
    ...data,
    pokemonId: pokemon.id,
  };
};

export type GenerateSkillTriggerCompareUnitOpts = {
  pokemon: PokemonInfo,
  chain: IngredientChain,
};

export const generateSkillTriggerCompareUnit = ({
  pokemon,
  chain,
}: GenerateSkillTriggerCompareUnitOpts): SkillTriggerCompareUnit => {
  const {id} = pokemon;

  return {
    level: 1,
    pokemonId: id,
    ingredients: generateIngredientProductionAtLevels(chain),
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
    subSkill: {},
    nature: null,
  };
};

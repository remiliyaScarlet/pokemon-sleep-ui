import {defaultSeedUsage} from '@/const/game/seed';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {SkillTriggerAnalysisUnit, SkillTriggerOnDeskState} from '@/ui/team/mainskill/type';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


export const toSkillTriggerAnalysisUnit = ({pokemon, ...data}: SkillTriggerOnDeskState): SkillTriggerAnalysisUnit => {
  return {
    ...data,
    pokemonId: pokemon.id,
    show: true,
  };
};

export type GenerateSkillTriggerAnalysisUnitOpts = {
  pokemon: PokemonInfo,
  chain: IngredientChain,
};

export const generateSkillTriggerAnalysisUnit = ({
  pokemon,
  chain,
}: GenerateSkillTriggerAnalysisUnitOpts): SkillTriggerAnalysisUnit => {
  const {id} = pokemon;

  return {
    level: 1,
    pokemonId: id,
    ingredients: generateIngredientProductionAtLevels(chain),
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
    seeds: defaultSeedUsage,
    subSkill: {},
    nature: null,
    show: true,
  };
};

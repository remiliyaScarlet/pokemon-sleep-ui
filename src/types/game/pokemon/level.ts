import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';


export const pokemonKeyLevels = [
  ...pokemonSubSkillLevel,
  ...ingredientLevels,
] as const;

export type PokemonKeyLevel = typeof pokemonKeyLevels[number];

import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';


export const pokeboxPreviewLevel = [
  ...ingredientLevels,
  ...pokemonSubSkillLevel,
] as const;

export type PokeboxPreviewLevel = typeof pokeboxPreviewLevel[number] | null;

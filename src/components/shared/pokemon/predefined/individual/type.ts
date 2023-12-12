import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';


export type PokemonIndividualParamsInput = {
  level: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

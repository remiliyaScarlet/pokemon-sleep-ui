import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';


export type PokemonProductionInput = {
  level: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

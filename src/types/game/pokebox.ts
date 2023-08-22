import {PokemonId} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subskill';
import {PokemonIngredientPick} from '@/types/game/producing/ingredient';


export type PokeInBox = {
  uuid: string,
  pokemon: PokemonId,
  name: string | null,
  level: number,
  randomIngredient: PokemonIngredientPick[],
  carryLimit: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export type Pokebox = {[uuid in string]?: PokeInBox};

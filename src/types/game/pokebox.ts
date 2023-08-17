import {PokemonSubSkill} from '@/types/game/pokemon/subskill';
import {PokemonIngredientPick} from '@/types/game/producing/ingredient';
import {NatureId} from '@/types/game/producing/nature';
import {PokemonId} from '@/types/mongo/pokemon';


export const pokeInBoxIngredientLevel = [
  30,
  60,
] as const;

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

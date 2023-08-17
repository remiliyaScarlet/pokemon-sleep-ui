import {PokemonSubSkill} from '@/types/game/pokemon/subskill';
import {NatureId} from '@/types/game/producing/nature';
import {IngredientId} from '@/types/mongo/ingredient';
import {PokemonId} from '@/types/mongo/pokemon';


export const pokeInBoxIngredientLevel = [
  30,
  60,
] as const;

export type PokeInBoxIngredientLevel = typeof pokeInBoxIngredientLevel[number];

export type PokeInBoxIngredientSingle = {
  id: IngredientId,
  quantity: number,
};

export type PokeInBoxIngredient = {
  // Value of `null` is for Pokémon that doesn't have their ingredient data available only
  [level in PokeInBoxIngredientLevel]: PokeInBoxIngredientSingle | null
};

export type PokeInBox = {
  uuid: string,
  pokemon: PokemonId,
  name: string | null,
  level: number,
  randomIngredient: PokeInBoxIngredient,
  carryLimit: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export type Pokebox = {[uuid in string]?: PokeInBox};

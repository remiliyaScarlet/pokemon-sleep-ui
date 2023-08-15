import {PokemonSubSkill} from '@/types/game/pokemon/subskill';
import {NatureId} from '@/types/game/producing/nature';
import {IngredientId} from '@/types/mongo/ingredient';
import {PokemonId} from '@/types/mongo/pokemon';


export type PokeInBoxIngredientLevel = 30 | 60;

export type PokeInBoxIngredientSingle = {
  id: IngredientId,
  quantity: number,
};

export type PokeInBoxIngredient = {[level in PokeInBoxIngredientLevel]: PokeInBoxIngredientSingle | null};

export type PokeInBox = {
  id?: string,
  pokemon: PokemonId,
  name: string | null,
  level: number,
  randomIngredient: PokeInBoxIngredient,
  carryLimit: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export type Pokebox = PokeInBox[];

import {PokemonId} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';


export type PokeInBox = {
  uuid: string,
  dateAdded: number | null,
  pokemon: PokemonId,
  name: string | null,
  level: number,
  ingredients: IngredientProductionAtLevels,
  carryLimit: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  isShiny?: boolean,
};

export type Pokebox = {[uuid in string]?: PokeInBox};

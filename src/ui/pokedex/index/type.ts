import {PokemonInfo, PokemonSkillId, PokemonSleepTypeId, PokemonTypeId} from '@/types/mongo/pokemon';
import {SleepMapId, SleepStyle} from '@/types/mongo/sleepStyle';


export type PokedexSinglePokemon = Pick<
  PokemonInfo,
  'id' | 'type' | 'sleepType' | 'berry' | 'skill' | 'ingredients'
> & {
  sleepStyles: SleepStyle[],
};

export type PokedexData = PokedexSinglePokemon[];

export type PokedexFilter = {
  name: string,
  type: PokemonTypeId | null,
  sleepType: PokemonSleepTypeId | null,
  skill: PokemonSkillId | null,
  mapId: SleepMapId | null,
};

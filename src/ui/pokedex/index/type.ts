import {PokemonId, PokemonInfo, PokemonSkillId, PokemonSleepTypeId, PokemonTypeId} from '@/types/mongo/pokemon';
import {SleepMapId, SleepStyleData} from '@/types/mongo/sleepStyle';
import {pokedexDisplayType} from '@/ui/pokedex/index/const';


export type PokedexSinglePokemon = Pick<
  PokemonInfo,
  'id' | 'type' | 'sleepType' | 'berry' | 'skill' | 'ingredients'
> & {
  sleepStyles: SleepStyleData[],
};

export type PokedexData = PokedexSinglePokemon[];

export type PokedexInclusionMap = {[id in PokemonId]?: boolean};

export type PokedexDisplayType = typeof pokedexDisplayType[number];

export type PokedexFilter = {
  name: string,
  type: PokemonTypeId | null,
  sleepType: PokemonSleepTypeId | null,
  skill: PokemonSkillId | null,
  mapId: SleepMapId | null,
  display: PokedexDisplayType,
};

export type PokedexLinkProps = PokedexSinglePokemon & Pick<PokedexFilter, 'display'>;

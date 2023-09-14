import {PokemonId} from '@/types/game/pokemon';
import {SleepStyleId} from '@/types/game/sleepStyle';


export type SleepdexStyleId = `${PokemonId}-${SleepStyleId}`;

export type SleepdexMap = {[id in SleepdexStyleId]?: true};

export type SleepdexData = {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
};

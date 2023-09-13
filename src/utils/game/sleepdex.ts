import {PokemonId} from '@/types/game/pokemon';
import {SleepdexMarkedByMapId, SleepdexMarkedByPokemonId} from '@/types/game/sleepdex';
import {SleepMapId, SleepStyleId} from '@/types/game/sleepStyle';


type ToSleepdexByMapIdOpts = {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
};

export const toSleepdexByMapId = ({pokemonId, styleId}: ToSleepdexByMapIdOpts): SleepdexMarkedByMapId => (
  `${pokemonId}-${styleId}`
);

type ToSleepdexByPokemonIdOpts = {
  mapId: SleepMapId,
  styleId: SleepStyleId,
};

export const toSleepdexByPokemonId = ({mapId, styleId}: ToSleepdexByPokemonIdOpts): SleepdexMarkedByPokemonId => (
  `${mapId}-${styleId}`
);

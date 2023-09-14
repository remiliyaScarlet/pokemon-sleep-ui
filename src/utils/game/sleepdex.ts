import {PokemonId} from '@/types/game/pokemon';
import {SleepdexStyleId} from '@/types/game/sleepdex';
import {SleepStyleId} from '@/types/game/sleepStyle';


type ToSleepdexByMapIdOpts = {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
};

export const toSleepdexStyleId = ({pokemonId, styleId}: ToSleepdexByMapIdOpts): SleepdexStyleId => (
  `${pokemonId}-${styleId}`
);

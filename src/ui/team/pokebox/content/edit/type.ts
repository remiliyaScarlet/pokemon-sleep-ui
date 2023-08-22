import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';


export type PokeboxPokeInBoxUpdateCommonProps = {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
  setPokeInBox: (newPokeInBox: PokeInBox) => void,
};

export type PokeboxPokeInBoxActionProps = {
  onRemovePokeInBox: () => void,
  onCopyPokeInBox: (pokeInBox: PokeInBox) => void,
};

import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/mongo/pokemon';


export type PokeboxPokeInBoxUpdateCommonProps = {
  pokeInBox: PokeInBox,
  pokeInBoxUiId: string,
  pokemon: PokemonInfo,
  setPokeInBox: (newPokeInBox: PokeInBox) => void,
};

export type PokeboxPokeInBoxActionProps = {
  onRemovePokeInBox: () => void,
  onCopyPokeInBox: (pokeInBox: PokeInBox) => void,
};

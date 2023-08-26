import {PokeInBox} from '@/types/game/pokebox';
import {PokeboxDataProps} from '@/ui/team/pokebox/type';


export type PokeboxPokeInBoxEditCommonProps = PokeboxDataProps & {
  onRemovePokeInBox: () => void,
};

export type PokeboxPokeInBoxActionProps = {
  onRemovePokeInBox: () => void,
  onCopyPokeInBox: (pokeInBox: PokeInBox) => void,
};

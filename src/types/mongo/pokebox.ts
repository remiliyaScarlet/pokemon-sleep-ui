import {PokeInBox} from '@/types/game/pokebox';


export type PokeInBoxData = Omit<PokeInBox, 'dateAdded'> & {
  owner: string,
};

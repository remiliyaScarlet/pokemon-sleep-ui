import {PokeInBox} from '@/types/userData/pokebox/main';
import {Optional} from '@/utils/type';


export type PokeInBoxData = Optional<PokeInBox, 'dateAdded'> & {
  owner: string,
};

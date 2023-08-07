import {PokemonInfo} from '@/types/mongo/pokemon';


export type PokemonLinkPopupState = {
  show: boolean,
  pokemon: PokemonInfo | null,
};

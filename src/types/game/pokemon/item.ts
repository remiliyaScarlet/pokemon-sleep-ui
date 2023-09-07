import {ItemId} from '@/types/game/item';
import {PokemonInfo} from '@/types/game/pokemon';


export type EvolutionItemMap = {[itemId in ItemId]: PokemonInfo[]};

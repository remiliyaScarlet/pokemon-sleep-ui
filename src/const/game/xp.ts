import {ItemId} from '@/types/game/item';
import {HandyCandySize, PokemonExpTypeId} from '@/types/game/pokemon/xp';


export const candyExpEquivalent = 25;

export const defaultExpType: PokemonExpTypeId = 1;

export const handyCandyItemId: {[size in HandyCandySize]: ItemId} = {
  small: 12,
  medium: 13,
  large: 14,
};

export const handyCandyConversionRate: {[itemId in ItemId]: number} = {
  12: 3,
  13: 20,
  14: 100,
};

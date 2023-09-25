import {IngredientId} from '@/types/game/ingredient';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';


export type IngredientIconsCommonProps = {
  useTextShadow?: boolean,
  markRed?: (ingredient: PokemonProducingItem<IngredientId>) => boolean,
};

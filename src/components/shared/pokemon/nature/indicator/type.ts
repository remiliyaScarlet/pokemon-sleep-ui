import {NatureId} from '@/types/game/pokemon/nature';


export type PokemonNatureIndicatorCommonProps = {
  nature: NatureId | null,
  hideName?: boolean,
};

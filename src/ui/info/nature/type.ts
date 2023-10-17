import {NatureEffectDirection, NatureEffectId} from '@/types/game/pokemon/nature';
import {Dimension} from '@/types/style';


export type NatureInfoEffectProps = {
  direction: NatureEffectDirection,
  effectId: NatureEffectId | null,
  dimension?: Dimension,
  isActive?: boolean,
};

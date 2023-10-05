import {EffectiveBonus} from '@/types/game/bonus';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate';


export type PokemonProducingStatsCommonProps = {
  bonus: EffectiveBonus,
  rate: PokemonProducingRate,
  specialty: PokemonSpecialtyId | null,
};

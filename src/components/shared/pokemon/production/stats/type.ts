import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate';


export type PokemonProducingStatsCommonProps = {
  rate: PokemonProducingRate,
  specialty: PokemonSpecialtyId | null,
};

import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';


export type PokemonDetailedProducingStatsProps = {
  settings: UserSettings,
  calculatedSettings: CalculatedUserSettings,
  rate: PokemonProducingRate,
  specialty: PokemonSpecialtyId | null,
};

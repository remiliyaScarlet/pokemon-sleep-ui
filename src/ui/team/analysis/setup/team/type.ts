import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {TeamProducingStatsSingle} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisMember, TeamAnalysisSetupModifyingProps, TeamAnalysisSlotName} from '@/ui/team/analysis/type';


export type TeamAnalysisFilledProps = TeamAnalysisSetupModifyingProps & {
  showPokemon: (pokemon: PokemonInfo) => void,
  calculatedSettings: CalculatedUserSettings,
};

export type TeamAnalysisFilledSlotProps = TeamAnalysisFilledProps & {
  snorlaxFavorite: SnorlaxFavorite,
  slotName: TeamAnalysisSlotName,
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  stats: TeamProducingStatsSingle,
};

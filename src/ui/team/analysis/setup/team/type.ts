import {EffectiveBonus} from '@/types/game/bonus';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamProducingStatsSingle} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisMember, TeamAnalysisSetupModifyingProps, TeamAnalysisSlotName} from '@/ui/team/analysis/type';


export type TeamAnalysisFilledProps = TeamAnalysisSetupModifyingProps & {
  snorlaxFavorite: SnorlaxFavorite,
  bonus: EffectiveBonus,
  showPokemon: (pokemon: PokemonInfo) => void,
};

export type TeamAnalysisFilledSlotProps = TeamAnalysisFilledProps & {
  slotName: TeamAnalysisSlotName,
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  stats: TeamProducingStatsSingle,
};

import {PokemonInfo} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {CalculatedUserSettings} from '@/types/userData/settings';


type ToRatingRequestOpts = CalculatedUserSettings & {
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  snorlaxFavorite: SnorlaxFavorite,
};

export const toRatingSetup = ({member, ...opts}: ToRatingRequestOpts): RatingSetupData => ({
  ...member,
  ...opts,
});

import {PokemonInfo} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {TeamAnalysisMember} from '@/ui/team/analysis/type';


type ToRatingRequestOpts = CalculatedUserSettings & {
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  snorlaxFavorite: SnorlaxFavorite,
};

export const toRatingSetup = ({member, ...opts}: ToRatingRequestOpts): RatingSetupData => ({
  ...member,
  ...opts,
});

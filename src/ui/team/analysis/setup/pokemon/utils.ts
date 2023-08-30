import {PokemonInfo} from '@/types/game/pokemon';
import {RatingBonus, RatingRequest} from '@/types/game/pokemon/rating';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisMember} from '@/ui/team/analysis/type';


type ToRatingRequestOpts = {
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  snorlaxFavorite: SnorlaxFavorite,
  bonus: RatingBonus,
};

export const toRatingRequest = ({member, ...opts}: ToRatingRequestOpts): RatingRequest => {
  return {
    timestamp: Date.now(),
    setup: {...member, ...opts},
  };
};

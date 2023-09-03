import {EffectiveBonus} from '@/types/game/bonus';
import {PokemonInfo} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisMember} from '@/ui/team/analysis/type';


type ToRatingRequestOpts = {
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  snorlaxFavorite: SnorlaxFavorite,
  bonus: EffectiveBonus,
};

export const toRatingSetup = ({member, ...opts}: ToRatingRequestOpts): RatingSetupData => ({
  ...member,
  ...opts,
});

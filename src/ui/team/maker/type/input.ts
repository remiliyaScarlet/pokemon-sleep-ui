import {PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {UserCookingPreset} from '@/types/userData/cooking';
import {TeamMakerMemberCount} from '@/ui/team/maker/type/common';


export const teamMakerBasis = [
  'strength',
  'mealCoverage',
] as const;

export type TeamMakerBasis = typeof teamMakerBasis[number];

export type TeamMakerInput = Pick<UserCookingPreset, 'mealType' | 'target' | 'recipeLevel' | 'ingredientCount'> & {
  snorlaxFavorite: SnorlaxFavorite,
  pokemon: PokemonInputFilter,
  memberCount: TeamMakerMemberCount,
  basis: TeamMakerBasis,
  previewLevel: PokemonKeyLevel | null,
  previewFinalEvolution: boolean,
  showInsufficientIngredients: boolean,
};

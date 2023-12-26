import {specialtyIdToType} from '@/const/game/pokemon';
import {defaultRatingBasisOfSpecialty} from '@/const/game/rating';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {RatingBasis} from '@/types/game/pokemon/rating/config';


export const getDefaultRatingBasis = (specialtyId: PokemonSpecialtyId | null): RatingBasis => (
  specialtyId ? defaultRatingBasisOfSpecialty[specialtyIdToType[specialtyId]] : 'totalProduction'
);

export const getSimulateHelperBonusOnSelf = (basis: RatingBasis) => basis !== 'skillTriggerValue';

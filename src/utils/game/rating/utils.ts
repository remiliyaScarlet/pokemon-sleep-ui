import {specialtyIdToType} from '@/const/game/pokemon';
import {defaultRatingBasis, defaultRatingBasisOfSpecialty} from '@/const/game/rating';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {RatingBasis} from '@/types/game/pokemon/rating';


export const getDefaultRatingBasis = (specialtyId: PokemonSpecialtyId | null): RatingBasis => (
  specialtyId ?
    defaultRatingBasisOfSpecialty[specialtyIdToType[specialtyId]] :
    defaultRatingBasis
);

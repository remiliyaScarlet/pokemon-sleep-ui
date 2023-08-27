import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subskill';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export type RatingSetupBonus = {
  ingredient: number,
};

export type RatingSetupData = {
  level: number,
  snorlaxFavorite: SnorlaxFavorite,
  ingredients: IngredientProductionAtLevels,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  bonus: RatingSetupBonus,
};

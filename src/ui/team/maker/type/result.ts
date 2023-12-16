import {PokeInBox} from '@/types/game/pokebox';
import {ProduceType} from '@/types/game/producing/common';
import {PokemonProducingRateFinal} from '@/types/game/producing/rate';
import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';
import {TeamMakerIngredientStats} from '@/ui/team/maker/type/common';


export type TeamMakerResultComp = {
  rates: PokemonProducingRateFinal<PokeInBox>,
  strength: {
    byType: {[type in ProduceType]: number},
    total: number,
  },
  ingredientStats: TeamMakerIngredientStats,
  finalEstimates: SnorlaxRankFinalEstimate[],
};

export type TeamMakerResult = {
  comps: TeamMakerResultComp[],
  settings: UserSettings,
  calculatedSettings: CalculatedUserSettings,
};

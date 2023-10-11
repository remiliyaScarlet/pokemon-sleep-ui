import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getDailyHelpsOfStateFromPokemonRate} from '@/utils/game/producing/frequency';


type GetMainSkillTriggerValueOpts = {
  rate: PokemonProducingRate,
  skillValue: number,
};

export const getMainSkillTriggerValue = ({rate, skillValue}: GetMainSkillTriggerValueOpts): number => (
  getDailyHelpsOfStateFromPokemonRate({rate, state: 'unfilledOnly'}) * skillValue
);

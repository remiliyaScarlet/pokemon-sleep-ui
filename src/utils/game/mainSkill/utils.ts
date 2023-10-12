import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getDailyHelpsOfStateFromPokemonRate} from '@/utils/game/producing/frequency';


type GetMainSkillTriggerValueOpts = {
  rate: PokemonProducingRate,
  skillValue: number,
};

// FIXME: this should address nature and subskill effects #349
export const getMainSkillTriggerValue = ({rate, skillValue}: GetMainSkillTriggerValueOpts): number => (
  getDailyHelpsOfStateFromPokemonRate({rate, state: 'unfilledOnly'}) * skillValue
);

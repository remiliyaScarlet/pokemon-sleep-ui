import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getDailyHelpsOfStateFromPokemonRate} from '@/utils/game/producing/frequency';


type GetSkillTriggerValueOpts = {
  rate: PokemonProducingRate,
  skillValue: number,
};

// FIXME: this should address nature and subskill effects #349
export const getSkillTriggerValue = ({rate, skillValue}: GetSkillTriggerValueOpts): number => (
  getDailyHelpsOfStateFromPokemonRate({rate, state: 'unfilledOnly'}) * skillValue
);

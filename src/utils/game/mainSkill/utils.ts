import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getSkillTriggerRateMultiplier, GetSkillTriggerRateMultiplierOpts} from '@/utils/game/mainSkill/multiplier';
import {getDailyHelpsOfStateFromPokemonRate} from '@/utils/game/producing/frequency';


type GetSkillTriggerValueOpts = GetSkillTriggerRateMultiplierOpts & {
  rate: PokemonProducingRate,
  skillValue: number,
};

export const getSkillTriggerValue = ({rate, skillValue, ...opts}: GetSkillTriggerValueOpts): number => (
  getDailyHelpsOfStateFromPokemonRate({rate, state: 'unfilledOnly'}) *
  getSkillTriggerRateMultiplier(opts) *
  skillValue
);

type GetSkillTriggerRateOpts = GetSkillTriggerRateMultiplierOpts & {
  skillRatePercent: number | null,
};

export const getSkillTriggerRate = ({skillRatePercent, ...opts}: GetSkillTriggerRateOpts): number => {
  if (!skillRatePercent) {
    return 0;
  }

  return (getSkillTriggerRateMultiplier(opts) * skillRatePercent) / 100;
};

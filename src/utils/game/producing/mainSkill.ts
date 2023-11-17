import {MainSkillData} from '@/types/game/pokemon/mainSkill';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProducingRateCommonParams, ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {getSkillTriggerRate} from '@/utils/game/mainSkill/utils';
import {applyBonus} from '@/utils/game/producing/apply';
import {getProducingRateBase} from '@/utils/game/producing/rate';


export type GetMainSkillProducingRateOpts = Omit<ProducingRateCommonParams, 'level'> & {
  subSkillBonus: GroupedSubSkillBonus | null,
  skillRatePercent: number | null,
  natureId: NatureId | null,
  skillData: MainSkillData | undefined,
};

export const getMainSkillProducingRate = ({
  pokemon,
  frequency,
  bonus,
  subSkillBonus,
  skillRatePercent,
  natureId,
}: GetMainSkillProducingRateOpts): ProducingRateOfItemOfSessions => {
  frequency *= (1 / getSkillTriggerRate({skillRatePercent, subSkillBonus, natureId}));

  const id = pokemon.skill;

  const data = {
    id,
    frequency,
    ...getProducingRateBase({
      frequency,
      count: 1,
      picks: 1,
      // FIXME: Needs a mechanism to determine this value
      energyPerCount: 1000,
    }),
  };

  return {
    id,
    sleep: applyBonus({
      bonus,
      produceType: 'skill',
      producingState: 'sleep',
      data,
    }),
    awake: applyBonus({
      bonus,
      produceType: 'skill',
      producingState: 'awake',
      data,
    }),
  };
};

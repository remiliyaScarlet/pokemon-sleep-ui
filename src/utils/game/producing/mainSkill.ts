import {durationOfDay} from '@/const/common';
import {EffectiveBonus} from '@/types/game/bonus';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProduceType} from '@/types/game/producing/common';
import {
  ProducingRateCommonParams,
  ProducingRateOfItem,
  ProducingRateOfItemOfSessions,
} from '@/types/game/producing/rate';
import {ProducingState} from '@/types/game/producing/state';
import {getMainSkillEquivalentStrengthOfSingle} from '@/utils/game/mainSkill/effect/main';
import {GetMainSkillEquivalentStrengthOpts} from '@/utils/game/mainSkill/effect/type';
import {getSkillTriggerRate} from '@/utils/game/mainSkill/utils';
import {applyBonus} from '@/utils/game/producing/apply';
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateBase} from '@/utils/game/producing/rate';


type ApplyMainSkillSleepingCapOpts<T extends ProducingRateOfItem | null> = {
  bonus: EffectiveBonus,
  produceType: ProduceType,
  producingState: ProducingState,
  timeToFullPack: number,
  sleepDurations: number[],
  data: T,
};

export const applyBonusWithMainSkillCapping = <T extends ProducingRateOfItem | null>({
  bonus,
  produceType,
  producingState,
  timeToFullPack,
  sleepDurations,
  data,
}: ApplyMainSkillSleepingCapOpts<T>): T => {
  if (!data) {
    return data;
  }

  const {stamina} = bonus;
  const staminaBonus = stamina[producingState];

  const energyMultiplier = getEnergyMultiplier({produceType, bonus});

  const frequency = Math.max(
    data.frequency / staminaBonus,
    Math.min(timeToFullPack, Math.max(...sleepDurations)),
  );
  const quantity = durationOfDay / frequency;

  return {
    ...data,
    frequency: frequency,
    quantity,
    energy: data.energy * quantity * energyMultiplier,
  };
};

export type GetMainSkillProducingRateOpts =
  Omit<ProducingRateCommonParams, 'level'> &
  GetMainSkillEquivalentStrengthOpts & {
    timeToFullPack: number,
    sleepDurations: number[],
    subSkillBonus: GroupedSubSkillBonus | null,
    skillRatePercent: number | null,
    natureId: NatureId | null,
  };

export const getMainSkillProducingRate = ({
  pokemon,
  frequency,
  bonus,
  timeToFullPack,
  sleepDurations,
  subSkillBonus,
  skillRatePercent,
  natureId,
  ...opts
}: GetMainSkillProducingRateOpts): ProducingRateOfItemOfSessions => {
  frequency *= (1 / getSkillTriggerRate({skillRatePercent, subSkillBonus, natureId}));

  const id = pokemon.skill;

  const strengthPerSkill = getMainSkillEquivalentStrengthOfSingle(opts);

  return {
    id,
    sleep: applyBonusWithMainSkillCapping({
      bonus,
      produceType: 'skill',
      producingState: 'sleep',
      data: {
        id,
        frequency,
        period: 'daily',
        energy: strengthPerSkill,
        quantity: 1,
      },
      timeToFullPack,
      sleepDurations,
    }),
    awake: applyBonus({
      bonus,
      produceType: 'skill',
      producingState: 'awake',
      data: {
        id,
        frequency,
        ...getProducingRateBase({
          frequency,
          count: 1,
          picks: 1,
          energyPerCount: strengthPerSkill,
        }),
      },
    }),
  };
};

import {specialtyIdMap} from '@/const/game/pokemon';
import {defaultUserSettings} from '@/const/user/settings';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {
  CalculatedUserSettings,
  UserCalculationBehavior,
  UserCalculationFullPackBehavior,
  UserSettings,
} from '@/types/userData/settings';
import {getSleepDurationsFromSleepSession} from '@/utils/game/sleep';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {DeepPartial} from '@/utils/type';
import {toEffectiveBonus, ToEffectiveBonusOpts} from '@/utils/user/bonus';


export const createUserSettings = (settings: DeepPartial<UserSettings> | undefined): UserSettings => {
  return cloneMerge(defaultUserSettings, settings);
};

type ToCalculatedUserSettingsOpts = ToEffectiveBonusOpts & {
  recoveryRate?: StaminaRecoveryRateConfig,
  behaviorOverride?: Partial<UserCalculationBehavior>,
};

export const toCalculatedUserSettings = ({
  settings,
  recoveryRate,
  behaviorOverride,
  ...opts
}: ToCalculatedUserSettingsOpts): CalculatedUserSettings => {
  if (recoveryRate) {
    settings = overrideRecoveryRate({settings, recoveryRate});
  }

  return {
    bonus: toEffectiveBonus({settings, ...opts}),
    sleepDurations: getSleepDurationsFromSleepSession(settings.stamina.sleepSession),
    behavior: {
      ...settings.behavior,
      ...behaviorOverride,
    },
  };
};

type OverrideRecoveryRateOpts = {
  settings: UserSettings,
  recoveryRate: StaminaRecoveryRateConfig,
};

export const overrideRecoveryRate = ({
  settings,
  recoveryRate,
}: OverrideRecoveryRateOpts): UserSettings => {
  return {
    ...settings,
    stamina: {
      ...settings.stamina,
      recoveryRate,
    },
  };
};

type IsFullPackOpts = {
  alwaysFullBack: UserCalculationFullPackBehavior,
  specialty: PokemonSpecialtyId | null,
};

export const isFullPack = ({alwaysFullBack, specialty}: IsFullPackOpts): boolean => {
  if (alwaysFullBack === 'berryOnly') {
    return specialty === specialtyIdMap.berry;
  }

  if (alwaysFullBack === 'always') {
    return true;
  }

  if (alwaysFullBack === 'disable') {
    return false;
  }

  throw new Error(`Unhandled full pack behavior [${alwaysFullBack}]`);
};

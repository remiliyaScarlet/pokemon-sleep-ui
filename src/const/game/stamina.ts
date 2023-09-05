import {StaminaCalcSkillRecoveryStrategy} from '@/types/game/producing/stamina';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const staminaStartingDefault = 100;

export const staminaDepleteInterval = 600;

export const maxSleepDuration = 8.5 * 3600; // 8.5 hrs

export const staminaCalcStrategyI18nId: {
  [strategy in StaminaCalcSkillRecoveryStrategy]: I18nMessageKeysOfNamespace<'UI.Stamina.Strategy'>
} = {
  optimistic: 'Optimistic',
  conservative: 'Conservative',
};

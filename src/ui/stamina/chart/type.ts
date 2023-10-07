import {StaminaCalcConfig} from '@/types/game/producing/stamina';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {StaminaEventLogFlattened} from '@/ui/stamina/type';


export type StaminaChartCommonProps = {
  config: StaminaCalcConfig,
  logs: StaminaEventLogFlattened[],
  titleI18nId: I18nMessageKeysOfNamespace<'UI.Stamina'>,
};

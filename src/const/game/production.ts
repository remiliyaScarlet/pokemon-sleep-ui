import {ProductionPeriod} from '@/types/game/producing/display';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const productionMultiplierByPeriod: {[period in ProductionPeriod]: number} = {
  daily: 1,
  weekly: 7,
};

export const productionStatsPeriodI18nId: {
  [period in ProductionPeriod]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex.Stats.Energy'>
} = {
  daily: 'Daily',
  weekly: 'Weekly',
};

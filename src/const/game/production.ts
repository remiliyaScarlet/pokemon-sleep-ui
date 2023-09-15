import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRateSingleParams} from '@/types/game/producing/rate';
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

export const defaultLevel = 1;

export const defaultHelperCount = 0;

export const defaultIngredientSplit = 0.2;

export const defaultNeutralOpts: ProducingRateSingleParams = {
  helperCount: defaultHelperCount,
  subSkillBonus: null,
  natureId: null,
};

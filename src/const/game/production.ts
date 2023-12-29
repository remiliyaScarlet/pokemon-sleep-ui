import {PokemonProducingParams} from '@/types/game/pokemon/producing';
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

export const defaultProductionPeriod: ProductionPeriod = 'daily';

export const defaultLevel = 30;

export const defaultSubSkillBonus = {};

export const defaultProducingParams: Omit<PokemonProducingParams, 'pokemonId'> = {
  dataCount: NaN,
  ingredientSplit: 0.2,
  skillValue: NaN,
  skillPercent: null,
  error: {
    ingredient: null,
    skill: null,
  },
};

export const defaultNeutralOpts: ProducingRateSingleParams = {
  subSkillBonus: defaultSubSkillBonus,
  natureId: null,
};

export const maxTeamMemberCount = 5;

export const helpingBonusEffectPerStack = 0.05;

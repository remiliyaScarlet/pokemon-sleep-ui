import {ProducingStateOfRate} from '@/types/game/producing/state';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const pokemonProducingStatsStateI18nId: {
  [state in ProducingStateOfRate]: I18nMessageKeysOfNamespace<'UI.Producing'>
} = {
  awake: 'State.Awake',
  sleepFilled: 'State.AsleepFilled',
  sleepVacant: 'State.AsleepUnfilled',
  equivalent: 'Total',
};

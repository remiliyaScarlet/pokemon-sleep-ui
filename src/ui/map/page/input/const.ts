import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {MapUnlockTableDisplayType} from '@/ui/map/page/type';


export const displayTypeToTranslationId: {
  [displayType in MapUnlockTableDisplayType]: I18nMessageKeysOfNamespace<'UI.InPage'>
} = {
  sleepStyle: 'Map.SleepStyle',
  specialty: 'Pokedex.Info.Specialty',
  sleepType: 'Pokedex.Info.SleepType',
};

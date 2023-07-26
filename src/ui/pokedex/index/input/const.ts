import {I18nMessageKeysOfObject} from '@/types/i18n';
import {PokedexDisplayType} from '@/ui/pokedex/index/type';


export const displayTypeToTranslationId: {
  [displayType in PokedexDisplayType]: I18nMessageKeysOfObject<IntlMessages['UI']['InPage']['Pokedex']>
} = {
  berry: 'Info.Berry',
  mainSkill: 'Info.MainSkill',
};

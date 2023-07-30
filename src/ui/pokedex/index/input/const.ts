import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {PokedexDisplayType} from '@/ui/pokedex/index/type';


export const displayTypeToTranslationId: {
  [displayType in PokedexDisplayType]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
} = {
  berry: 'Info.Berry',
  mainSkill: 'Info.MainSkill',
  ingredient: 'Info.Ingredient',
};

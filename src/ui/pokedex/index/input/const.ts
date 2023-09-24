import {sortTypeToI18nId} from '@/components/shared/pokemon/sorter/const';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {PokedexDisplayType} from '@/ui/pokedex/index/input/type';


export const displayTypeToI18nId: {
  [displayType in PokedexDisplayType]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
} = {
  ...sortTypeToI18nId,
  berry: 'Info.Berry',
  mainSkill: 'Info.MainSkill',
  ingredient: 'Info.Ingredient',
  sleepType: 'Info.SleepType',
  specialty: 'Info.Specialty',
};

export const pokedexSortExclusions: PokemonSortType[] = ['dateAdded', 'level'];

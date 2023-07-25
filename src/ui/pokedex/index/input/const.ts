import {I18nValidKeys} from '@/types/i18n';
import {PokemonSleepTypeId} from '@/types/mongo/pokemon';
import {PokedexDisplayType} from '@/ui/pokedex/index/type';


export const sleepTypeClass: {[id in PokemonSleepTypeId]: string} = {
  0: 'bg-sleep-deep',
  1: 'bg-sleep-light',
  4: 'bg-sleep-awake',
};

export const toggleClass = {
  active: {
    hover: 'hover:bg-slate-500 dark:hover:bg-slate-400 hover:text-slate-100 dark:hover:text-slate-800',
    background: 'bg-slate-800 text-slate-100 dark:bg-slate-50 dark:text-slate-800',
  },
  inactive: {
    hover: 'hover:bg-slate-400 dark:hover:bg-slate-500 hover:text-slate-900 dark:hover:text-slate-100',
    background: 'bg-slate-400/20 dark:bg-slate-700/50',
  },
};

export const displayTypeToTranslationId: {
  [displayType in PokedexDisplayType]: I18nValidKeys<IntlMessages['UI']['InPage']['Pokedex']>
} = {
  berry: 'Pokemon.Info.Berry',
  mainSkill: 'Input.Skill',
};

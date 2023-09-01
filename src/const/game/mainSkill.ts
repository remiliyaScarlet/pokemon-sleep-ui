import {MainSkillEffectType} from '@/types/game/pokemon/mainSkill';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const mainSkillEffectTypeI18nId: {
  [type in MainSkillEffectType]: I18nMessageKeysOfNamespace<'UI.MainSkill.EffectType'>
} = {
  strength: 'Strength',
  shards: 'Shards',
  stamina: 'Stamina',
  help: 'Help',
  cooking: 'Cooking',
  random: 'Random',
};

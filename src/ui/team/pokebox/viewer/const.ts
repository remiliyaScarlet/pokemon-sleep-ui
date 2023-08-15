import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';


export const pokeboxDisplayTypeToI18nId: {
  [sortType in PokeboxDisplayType]: I18nMessageKeysOfNamespace<'UI.InPage.Team.Box.DisplayType'>
} = {
  production: 'Production',
  skills: 'Skills',
  stats: 'Stats',
  info: 'Info',
};

export const pokeboxDisplayTypeToImageSrc: {[sortType in PokeboxDisplayType]: string} = {
  production: '/images/generic/energy_white.png',
  skills: '/images/generic/skill.png',
  stats: '/images/generic/analysis.png',
  info: '/images/generic/info.png',
};

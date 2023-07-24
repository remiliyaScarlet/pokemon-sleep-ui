import {I18nValidKeys} from '@/types/i18n';
import {TailwindBackgroundClass} from '@/types/tailwind';


export type NavEntry = {
  href: string,
  imageSrc: string,
  i18nTextId: I18nValidKeys<IntlMessages['UI']['Metadata']>,
  activeBgClassName: TailwindBackgroundClass,
};

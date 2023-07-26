import {I18nValidKeys} from '@/types/i18n';


export type NavEntry = {
  href: string,
  imageSrc: string,
  i18nTextId: I18nValidKeys<IntlMessages['UI']['Metadata']>,
  disabled?: boolean,
};

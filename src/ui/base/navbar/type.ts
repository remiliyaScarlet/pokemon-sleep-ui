import {I18nMessageKeysOfObject} from '@/types/i18n';


export type NavEntry = {
  href: string,
  imageSrc: string,
  i18nTextId: I18nMessageKeysOfObject<IntlMessages['UI']['Metadata']>,
  disabled?: boolean,
};

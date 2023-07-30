import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export type NavEntry = {
  href: string,
  imageSrc: string,
  i18nTextId: I18nMessageKeysOfNamespace<'UI.Metadata'>,
  disabled?: boolean,
};

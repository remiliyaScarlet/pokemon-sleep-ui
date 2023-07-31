import {FeatureLinkImageProps} from '@/components/shared/link/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export type NavEntry = FeatureLinkImageProps & {
  i18nTextId: I18nMessageKeysOfNamespace<'UI.Metadata'>,
};

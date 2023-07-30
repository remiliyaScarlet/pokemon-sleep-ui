import MessageKeys from 'use-intl/dist/core/utils/MessageKeys';
import NamespaceKeys from 'use-intl/dist/core/utils/NamespaceKeys';
import NestedKeyOf from 'use-intl/dist/core/utils/NestedKeyOf';
import NestedValueOf from 'use-intl/dist/core/utils/NestedValueOf';


export type I18nNamespaces = NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>;

type I18nMessageKeysOfObject<TMessageObject> = MessageKeys<TMessageObject, NestedKeyOf<TMessageObject>>;

type I18nNamespaceObject<TNamespace extends I18nNamespaces> = NestedValueOf<
  {'!': IntlMessages},
  [TNamespace] extends [never] ? '!' : `!.${TNamespace}`
>;

export type I18nMessageKeysOfNamespace<
  TNamespace extends I18nNamespaces
> = I18nMessageKeysOfObject<I18nNamespaceObject<TNamespace>>;

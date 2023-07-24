import MessageKeys from 'use-intl/dist/core/utils/MessageKeys';
import NamespaceKeys from 'use-intl/dist/core/utils/NamespaceKeys';
import NestedKeyOf from 'use-intl/dist/core/utils/NestedKeyOf';


export type I18nValidNamespaces<T> = NamespaceKeys<T, NestedKeyOf<T>>;

export type I18nValidKeys<T> = MessageKeys<T, NestedKeyOf<T>>;

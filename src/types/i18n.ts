import MessageKeys from 'use-intl/dist/core/utils/MessageKeys';
import NestedKeyOf from 'use-intl/dist/core/utils/NestedKeyOf';


export type I18nValidKeys<T> = MessageKeys<T, NestedKeyOf<T>>;

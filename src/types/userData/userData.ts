import {UserLazyLoadedContent} from '@/types/userData/lazyLoaded';
import {UserPreloadedContent} from '@/types/userData/preloaded';
import {DeepPartialExceptKey} from '@/utils/type';


export type UserPreloadedData = DeepPartialExceptKey<UserPreloadedContent>;

export type UserLazyLoadedData = DeepPartialExceptKey<UserLazyLoadedContent>;

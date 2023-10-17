import {defaultLocale} from '@/const/website';
import {createServerContext} from '@/hooks/serverContext/main';
import {Locale} from '@/types/next/locale';


export const {get: getLocale, set: setLocale} = createServerContext<Locale>(defaultLocale);

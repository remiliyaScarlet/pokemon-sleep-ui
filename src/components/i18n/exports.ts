import {createSharedPathnamesNavigation} from 'next-intl/navigation';

import {defaultLocale} from '@/const/website';
import {createServerContext} from '@/hooks/serverContext/main';
import {Locale, locales} from '@/types/next/locale';


export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales});

export const {get: getLocale, set: setLocale} = createServerContext<Locale>(defaultLocale);

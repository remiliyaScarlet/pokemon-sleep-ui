import {createSharedPathnamesNavigation} from 'next-intl/navigation';


import {locales} from '@/types/next/locale';


export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales});

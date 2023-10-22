import {createSharedPathnamesNavigation} from 'next-intl/navigation';

import {locales} from '@/const/website';


export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales});

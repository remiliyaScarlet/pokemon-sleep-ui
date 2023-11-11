import {NavEntryLink} from '@/types/nav';


export const navEntriesForSleepStyle: NavEntryLink[] = [
  {
    type: 'link',
    href: '/map',
    imageSrc: '/images/generic/map.png',
    i18nTextId: 'SleepStyle.Map.Index.Title',
  },
  {
    type: 'link',
    href: '/sleepdex',
    imageSrc: '/images/generic/sleep.png',
    i18nTextId: 'SleepStyle.Sleepdex.Title',
  },
  {
    type: 'link',
    href: '/sleepstyle/special',
    imageSrc: '/images/generic/incense.png',
    i18nTextId: 'SleepStyle.Special.Title',
  },
  {
    type: 'link',
    href: '/map/unique',
    imageSrc: '/images/generic/map.png',
    i18nTextId: 'SleepStyle.UniqueMap.Index.Title',
  },
];

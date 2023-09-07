import {NavEntry} from '@/types/nav';
import {Locale} from '@/types/next/locale';


export const localeName = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  kr: '한국어',
  de: 'Deutsch',
} as const;

export const defaultLocale: Locale = 'zh';

export const locales = Object.keys(localeName);

export const navEntries: NavEntry[] = [
  {
    href: '/pokedex',
    imageSrc: '/images/generic/pokeball.png',
    i18nTextId: 'Pokedex.Index.Title',
  },
  {
    href: '/rating',
    imageSrc: '/images/generic/search.png',
    i18nTextId: 'Rating.Title',
  },
  {
    href: '/map',
    imageSrc: '/images/generic/map.png',
    i18nTextId: 'Map.Index.Title',
  },
  {
    href: '/cooking',
    imageSrc: '/images/generic/pot.png',
    i18nTextId: 'Cooking.Title',
  },
  {
    href: '/meal',
    imageSrc: '/images/generic/meal.png',
    i18nTextId: 'Meal.Index.Title',
  },
  {
    href: '/berry',
    imageSrc: '/images/generic/berry.png',
    i18nTextId: 'Berry.Index.Title',
  },
  {
    href: '/ingredient',
    imageSrc: '/images/generic/ingredient.png',
    i18nTextId: 'Ingredient.Index.Title',
  },
  {
    href: '/team',
    imageSrc: '/images/generic/team.png',
    i18nTextId: 'Team.Index.Title',
  },
  {
    href: '/info',
    imageSrc: '/images/generic/info.png',
    i18nTextId: 'Info.Index.Title',
  },
  {
    href: '/item',
    imageSrc: '/images/generic/bag.png',
    i18nTextId: 'Item.Index.Title',
  },
  {
    href: '/about',
    imageSrc: '/images/generic/globe.png',
    i18nTextId: 'About.Title',
    showInHome: false,
  },
];

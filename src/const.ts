import {NavEntry} from '@/types/nav';


export const localeName = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  kr: '한국어',
} as const;

export const locales = Object.keys(localeName);

export const navEntries: NavEntry[] = [
  {
    href: '/pokedex',
    imageSrc: '/images/generic/pokeball.png',
    i18nTextId: 'Pokedex.Index.Title',
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
    href: '/ingredient',
    imageSrc: '/images/generic/ingredient.png',
    i18nTextId: 'Ingredient.Index.Title',
  },
  {
    href: '/map',
    imageSrc: '/images/generic/map.png',
    i18nTextId: 'Map.Index.Title',
  },
  {
    href: '/skill',
    imageSrc: '/images/generic/skill.png',
    i18nTextId: 'Skill.Index.Title',
    disabled: true,
  },
];

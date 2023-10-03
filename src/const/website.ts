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
    type: 'link',
    href: '/pokedex',
    imageSrc: '/images/generic/pokeball.png',
    i18nTextId: 'Pokedex.Index.Title',
  },
  {
    type: 'link',
    href: '/rating',
    imageSrc: '/images/generic/search.png',
    i18nTextId: 'Rating.Title',
  },
  {
    type: 'link',
    href: '/map',
    imageSrc: '/images/generic/map.png',
    i18nTextId: 'Map.Index.Title',
  },
  {
    type: 'link',
    href: '/cooking',
    imageSrc: '/images/generic/pot.png',
    i18nTextId: 'Cooking.Title',
  },
  {
    type: 'link',
    href: '/meal',
    imageSrc: '/images/generic/meal.png',
    i18nTextId: 'Meal.Index.Title',
  },
  {
    type: 'link',
    href: '/berry',
    imageSrc: '/images/generic/berry.png',
    i18nTextId: 'Berry.Index.Title',
  },
  {
    type: 'link',
    href: '/ingredient',
    imageSrc: '/images/generic/ingredient.png',
    i18nTextId: 'Ingredient.Index.Title',
  },
  {
    type: 'group',
    href: '/team',
    imageSrc: '/images/generic/team.png',
    i18nTextId: 'Team.Index.Title',
    entries: [
      {
        type: 'link',
        href: '/team/box',
        imageSrc: '/images/generic/bag.png',
        i18nTextId: 'Team.Box.Title',
      },
      {
        type: 'link',
        href: '/team/analysis',
        imageSrc: '/images/generic/pokeball.png',
        i18nTextId: 'Team.Analysis.Title',
      },
      {
        type: 'link',
        href: '/team/maker',
        imageSrc: '/images/generic/wrenches.png',
        i18nTextId: 'Team.Maker.Title',
        disabled: true,
      },
    ],
  },
  {
    type: 'group',
    href: '/info',
    imageSrc: '/images/generic/info.png',
    i18nTextId: 'Info.Index.Title',
    entries: [
      {
        type: 'link',
        href: '/info/pot',
        imageSrc: '/images/generic/pot.png',
        i18nTextId: 'Info.Pot.Title',
      },
      {
        type: 'link',
        href: '/info/nature',
        imageSrc: '/images/generic/memo.png',
        i18nTextId: 'Info.Nature.Title',
      },
      {
        type: 'link',
        href: '/info/mainskill',
        imageSrc: '/images/generic/mainSkill.png',
        i18nTextId: 'Info.MainSkill.Index.Title',
      },
      {
        type: 'link',
        href: '/info/subskill',
        imageSrc: '/images/generic/subSkill.png',
        i18nTextId: 'Info.SubSkill.Title',
      },
    ],
  },
  {
    type: 'group',
    href: '/item',
    imageSrc: '/images/generic/bag.png',
    i18nTextId: 'Item.Index.Title',
    entries: [
      {
        type: 'link',
        href: '/item/evolution',
        imageSrc: '/images/generic/flash.png',
        i18nTextId: 'Item.Evolution.Title',
      },
      {
        type: 'link',
        href: '/item/incense',
        imageSrc: '/images/generic/incense.png',
        i18nTextId: 'Item.Incense.Index.Title',
        disabled: true,
      },
    ],
  },
  {
    type: 'link',
    href: '/xp',
    imageSrc: '/images/generic/candy_white.png',
    i18nTextId: 'PokemonExp.Title',
  },
  {
    type: 'link',
    href: '/about',
    imageSrc: '/images/generic/globe.png',
    i18nTextId: 'About.Title',
    showInHome: false,
  },
];

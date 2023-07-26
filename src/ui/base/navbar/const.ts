import {NavEntry} from '@/ui/base/navbar/type';


export const NavEntries: NavEntry[] = [
  {
    href: '/pokedex',
    imageSrc: '/images/generic/pokeball.png',
    i18nTextId: 'Pokedex.Index.Title',
  },
  {
    href: '/meal',
    imageSrc: '/images/generic/meal.png',
    i18nTextId: 'Meal.Index.Title',
  },
  {
    href: '/map',
    imageSrc: '/images/generic/map.png',
    i18nTextId: 'Map.Index.Title',
    disabled: true,
  },
  {
    href: '/skill',
    imageSrc: '/images/generic/skill.png',
    i18nTextId: 'Skill.Index.Title',
    disabled: true,
  },
];

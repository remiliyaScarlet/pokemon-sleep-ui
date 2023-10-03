import {navEntriesForInfo} from '@/const/nav/info';
import {navEntryForItem} from '@/const/nav/item';
import {navEntriesForTeam} from '@/const/nav/team';
import {NavEntry} from '@/types/nav';


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
    entries: navEntriesForTeam,
  },
  {
    type: 'group',
    href: '/info',
    imageSrc: '/images/generic/info.png',
    i18nTextId: 'Info.Index.Title',
    entries: navEntriesForInfo,
  },
  {
    type: 'group',
    href: '/item',
    imageSrc: '/images/generic/bag.png',
    i18nTextId: 'Item.Index.Title',
    entries: navEntryForItem,
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
  },
];

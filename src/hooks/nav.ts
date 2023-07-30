'use client';
import React from 'react';

import {NavEntry} from '@/types/nav';


const navEntries: NavEntry[] = [
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
    disabled: true,
  },
  {
    href: '/skill',
    imageSrc: '/images/generic/skill.png',
    i18nTextId: 'Skill.Index.Title',
    disabled: true,
  },
];

// Need to "cache" the nav entries (effectively making whatever using nav entries a client component)
// If this is not stored, fast refresh will not work i.e. every page change triggers full reload
export const useNavEntries = () => React.useMemo(() => navEntries, []);

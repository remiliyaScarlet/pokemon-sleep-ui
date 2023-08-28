import React from 'react';

import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon';

import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {PokeboxDisplayType, PokeboxViewType} from '@/ui/team/pokebox/viewer/type';


export const pokeboxDisplayTypeToI18nId: {
  [sortType in PokeboxDisplayType]: I18nMessageKeysOfNamespace<'UI.InPage.Team.Box.DisplayType'>
} = {
  productionTotal: 'ProductionTotal',
  productionBerry: 'ProductionBerry',
  productionIngredient: 'ProductionIngredient',
  rating: 'Rating',
  skills: 'Skills',
  stats: 'Stats',
  info: 'Info',
};

export const pokeboxDisplayTypeToImageSrc: {[sortType in PokeboxDisplayType]: string} = {
  productionTotal: '/images/generic/energy_white.png',
  productionBerry: '/images/generic/berry.png',
  productionIngredient: '/images/generic/ingredient.png',
  rating: '/images/generic/search.png',
  skills: '/images/generic/skill.png',
  stats: '/images/generic/analysis.png',
  info: '/images/generic/info.png',
};

export const pokeboxViewTypeToIcon: {[viewType in PokeboxViewType]: React.ReactNode} = {
  table: <TableCellsIcon/>,
  grid: <Squares2X2Icon/>,
};

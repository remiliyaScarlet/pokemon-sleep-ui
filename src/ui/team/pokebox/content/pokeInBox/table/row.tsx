import React from 'react';

import {isFilterIncludingSome} from '@/components/input/filter/utils/check';
import {Flex} from '@/components/layout/flex';
import {PokeInBoxFrequencyInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/frequency';
import {PokeInBoxDetailsInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/info';
import {PokeInBoxMaxCarryInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/maxCarry';
import {PokeInBoxProductionInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/production';
import {PokeInBoxRatingInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/rating';
import {PokeInBoxSkillsInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/skills';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {PokeInBoxTableRowHeader} from '@/ui/team/pokebox/content/pokeInBox/table/header';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {getRateOfBerry, getRateOfIngredients} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {PokeboxDisplayType, PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


type Props = PokeInBoxViewUnitProps & {
  display: PokeboxViewerDisplay,
};

export const PokeInBoxTableRow = (props: Props) => {
  const {
    pokeInBox,
    pokedexMap,
    display,
    isLevelPreview,
    onClick,
  } = props;
  const pokemon = pokedexMap[pokeInBox.pokemon];

  if (!pokemon) {
    return <></>;
  }

  const pokeInBoxProps: PokeInBoxCommonProps = {
    ...props,
    pokemon,
  };

  const rateOfBerry = getRateOfBerry(pokeInBoxProps);
  const rateOfIngredients = getRateOfIngredients(pokeInBoxProps);

  const detailProps: PokeInBoxTableDetailsProps = {
    ...pokeInBoxProps,
    isLevelPreview,
    rateOfBerry,
    rateOfIngredients,
    display,
  };

  return (
    <Flex direction="row" className="gap-1">
      {/* `pokemon` comes later because `props` from upstream could contain `pokemon` as list of Pokémon */}
      <PokeInBoxTableRowHeader {...props} pokemon={pokemon}/>
      <button className="button-clickable-bg group rounded-lg p-1" onClick={onClick}>
        <Flex direction="row" noFullWidth className="items-center gap-1 [&>*]:shrink-0">
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['info'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxDetailsInTable {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['productionTotal', 'productionBerry', 'productionIngredient'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxProductionInTable {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['rating'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxRatingInTable {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['frequency'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxFrequencyInTable {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['maxCarry'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxMaxCarryInTable {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['skills'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxSkillsInTable {...detailProps}/>}
        </Flex>
      </button>
    </Flex>
  );
};

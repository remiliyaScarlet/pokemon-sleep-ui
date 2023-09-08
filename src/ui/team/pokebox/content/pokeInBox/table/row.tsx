import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokeInBoxDetailsInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/info';
import {PokeInBoxProductionInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/production';
import {PokeInBoxRatingInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/rating';
import {PokeInBoxSkillsInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/skills';
import {PokeInBoxStatsInTable} from '@/ui/team/pokebox/content/pokeInBox/table/details/stats';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {PokeInBoxTableRowHeader} from '@/ui/team/pokebox/content/pokeInBox/table/header';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {getRateOfBerry, getRateOfIngredients} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxTableRow = (props: PokeInBoxViewUnitProps) => {
  const {
    pokeInBox,
    pokedexMap,
    displayType,
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
    displayType,
  };

  const rateOfBerry = getRateOfBerry(pokeInBoxProps);
  const rateOfIngredients = getRateOfIngredients(pokeInBoxProps);

  const detailProps: PokeInBoxTableDetailsProps = {
    ...pokeInBoxProps,
    isLevelPreview,
    rateOfBerry,
    rateOfIngredients,
  };

  return (
    <Flex direction="row" className="gap-1">
      {/* `pokemon` comes later because `props` from upstream could contain `pokemon` as list of Pokémon */}
      <PokeInBoxTableRowHeader {...props} pokemon={pokemon}/>
      <button className="button-clickable-bg group rounded-lg p-1" onClick={onClick}>
        <Flex direction="row" noFullWidth className="items-center gap-1 [&>*]:shrink-0">
          <PokeInBoxDetailsInTable {...detailProps}/>
          <PokeInBoxProductionInTable {...detailProps}/>
          <PokeInBoxRatingInTable {...detailProps}/>
          <PokeInBoxStatsInTable {...detailProps}/>
          <PokeInBoxSkillsInTable {...detailProps}/>
        </Flex>
      </button>
    </Flex>
  );
};

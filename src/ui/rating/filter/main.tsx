import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';

import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {useRatingFilter} from '@/ui/rating/filter/hook';
import {RatingPokemonPicker} from '@/ui/rating/filter/pokemon';
import {RatingFilterCommonProps} from '@/ui/rating/filter/type';
import {getPokedexWithField} from '@/utils/game/pokemon';


type Props = RatingFilterCommonProps;

export const RatingFilter = (props: Props) => {
  const {
    pokedex,
    sleepStyleMap,
    ingredientChainMap,
  } = props;

  const {filter, setFilter, isIncluded} = useRatingFilter({
    data: getPokedexWithField({pokedex, sleepStyleMap}),
    ingredientChainMap,
  });
  const filterCollapsible = useCollapsible();
  const resultCollapsible = useCollapsible();

  React.useEffect(() => {
    resultCollapsible.setShow(true);
  }, [filter]);

  return (
    <Flex direction="col" className="gap-1">
      <Collapsible state={filterCollapsible} classNameForHeight="h-72" button={
        <Flex direction="row" center className="gap-0.5">
          <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
          <div className="h-6 w-6">
            <FunnelIcon/>
          </div>
        </Flex>
      }>
        <Flex direction="col" className="gap-1">
          {pokemonInputType.map((type) => (
            <PokemonFilter
              key={type}
              filter={filter}
              setFilter={setFilter}
              type={type}
              filterKey={type}
              pokemon={pokedex}
              ingredientChainMap={ingredientChainMap}
            />
          ))}
        </Flex>
      </Collapsible>
      <RatingPokemonPicker collapsibleState={resultCollapsible} isIncluded={isIncluded} {...props}/>
    </Flex>
  );
};

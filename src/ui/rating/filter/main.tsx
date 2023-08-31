import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon';

import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex';
import {FlexButton} from '@/components/layout/flexButton';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokeboxImporter} from '@/components/shared/pokebox/importer/main';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {useRatingFilter} from '@/ui/rating/filter/hook';
import {RatingPokemonPicker} from '@/ui/rating/filter/pokemon';
import {RatingFilterCommonProps} from '@/ui/rating/filter/type';
import {getPokedexWithField} from '@/utils/game/pokemon';


type Props = RatingFilterCommonProps;

export const RatingFilter = (props: Props) => {
  const {
    pokemonList,
    pokedexMap,
    sleepStyleMap,
    ingredientChainMap,
    subSkillMap,
    onPokemonPicked,
  } = props;

  const {filter, setFilter, isIncluded} = useRatingFilter({
    data: getPokedexWithField({pokemonList, sleepStyleMap}),
    ingredientChainMap,
  });
  const [show, setShow] = React.useState(false);
  const filterCollapsible = useCollapsible();
  const resultCollapsible = useCollapsible();

  React.useEffect(() => {
    resultCollapsible.setShow(true);
  }, [filter]);

  return (
    <Flex direction="col" className="gap-1">
      <PokeboxImporter show={show} setShow={setShow} subSkillMap={subSkillMap} onPokeboxPicked={(pokeInBox) => {
        const pokemon = pokedexMap[pokeInBox.pokemon];

        if (!pokemon) {
          return;
        }

        onPokemonPicked({...pokeInBox, origin: 'pokebox', pokemon});
        setShow(false);
      }}/>
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
              pokemonList={pokemonList}
              ingredientChainMap={ingredientChainMap}
            />
          ))}
        </Flex>
      </Collapsible>
      <RatingPokemonPicker collapsibleState={resultCollapsible} isIncluded={isIncluded} {...props}/>
      <FlexButton center className="button-clickable-bg p-1" onClick={() => setShow(true)}>
        <div className="relative h-8 w-8">
          <InboxArrowDownIcon/>
        </div>
      </FlexButton>
    </Flex>
  );
};

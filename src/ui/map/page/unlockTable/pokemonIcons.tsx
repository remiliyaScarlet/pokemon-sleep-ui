import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIconList} from '@/components/shared/pokemon/icon/list';
import {useUpdateSleepdex} from '@/hooks/sleepdex/update';
import {MapTableInfoIcon} from '@/ui/map/page/unlockTable/infoIcon';
import {MapUnlockTableRowProps} from '@/ui/map/page/unlockTable/type';
import {isInSleepdex, toSleepdexStyleId} from '@/utils/game/sleepdex';


export const MapUnlockTablePokemonIcons = ({
  pokedexMap,
  filter,
  matchingStyles,
  sleepdex,
  setSleepdex,
}: MapUnlockTableRowProps) => {
  const {displayType, markingSleepdex} = filter;

  const updateSleepdex = useUpdateSleepdex({sleepdex, setSleepdex});

  const showMatchingStyles = filter.showUnlockedSleepStyles ?
    (matchingStyles.map((data) => ({...data, show: true}))) :
    (matchingStyles.map((data) => ({...data, show: (
      !isInSleepdex({
        pokemonId: data.pokemonId,
        styleId: data.style.style,
        sleepdex,
      }) === true)})));


  return (
    <Flex center>
      <PokemonIconList
        dataWithPokemon={showMatchingStyles}
        getPokemon={({pokemonId}) => pokedexMap[pokemonId]}
        getPokemonId={({pokemonId}) => pokemonId}
        getInfo={(data) => (
          <MapTableInfoIcon data={data} pokedex={pokedexMap} displayType={displayType}/>
        )}
        getClassName={({pokemonId, style}) => clsx(
          'm-0.5',
          sleepdex[toSleepdexStyleId({pokemonId, styleId: style.style})] &&
          'bg-corner-mark',
        )}
        getReactKey={({pokemonId, style}) => `${pokemonId}-${style.style}`}
        onClickOverride={
          markingSleepdex ?
            ({pokemonId, style}) => updateSleepdex({pokemonId, styleId: style.style}) :
            undefined
        }
        showData={({show}) => show}
      />
    </Flex>
  );
};

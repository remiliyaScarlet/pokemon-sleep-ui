import React from 'react';

import {clsx} from 'clsx';

import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxLevel} from '@/ui/team/pokebox/content/pokeInBox/common/level';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxTableInfo = (props: PokeInBoxTableDetailsProps) => {
  const {pokeInBox, pokemon, isLevelPreview} = props;
  const {specialty} = pokemon;

  return (
    <>
      <PokeInBoxLevel viewType="table" level={pokeInBox.level} isLevelPreview={isLevelPreview}/>
      <div className="w-60">
        <PokeInBoxMeta {...props}/>
      </div>
      <div className={clsx(
        'rounded-lg px-2',
        specialty === specialtyIdMap.ingredient && 'info-highlight',
      )}>
        <PokemonIngredientIcons
          ingredients={[Object.values(pokeInBox.ingredients).map((ingredient) => ingredient)]}
        />
      </div>
    </>
  );
};

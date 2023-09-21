import React from 'react';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {PokemonEvolutionSelector} from '@/components/shared/pokemon/evolution/selector';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';


type Props = TeamAnalysisPokemonProps & {
  showIngredientPicker: boolean,
  setShowIngredientPicker: React.Dispatch<React.SetStateAction<boolean>>,
  showEvolutionSelector: boolean,
  setShowEvolutionSelector: React.Dispatch<React.SetStateAction<boolean>>,
  ratingControl: RatingPopupControl,
};

export const TeamAnalysisPokemonPopup = ({
  showIngredientPicker,
  setShowIngredientPicker,
  showEvolutionSelector,
  setShowEvolutionSelector,
  ratingControl,
  ...props
}: Props) => {
  const {
    slotName,
    pokemon,
    member,
    setMember,
    ingredientChainMap,
    pokedex,
  } = props;
  const {id, ingredientChain} = pokemon;

  return (
    <>
      <Popup show={showIngredientPicker} setShow={setShowIngredientPicker}>
        <Flex direction="col" noFullWidth className="sm:w-[70vw]">
          <PokemonIngredientPicker
            chain={ingredientChainMap[ingredientChain]}
            ingredients={member.ingredients}
            onSelect={(updated, ingredientLevel) => setMember(
              slotName,
              {
                ...member,
                ingredients: {
                  ...member.ingredients,
                  [ingredientLevel]: updated,
                },
              },
            )}
            idPrefix={id.toString()}
          />
        </Flex>
      </Popup>
      <Popup show={showEvolutionSelector} setShow={setShowEvolutionSelector}>
        <PokemonEvolutionSelector
          pokemon={pokemon}
          pokedex={pokedex}
          onClick={(pokemonId) => {
            setMember(slotName, {pokemonId});
            setShowEvolutionSelector(false);
          }}
        />
      </Popup>
      <RatingResultPopup ratingControl={ratingControl} {...props}/>
    </>
  );
};

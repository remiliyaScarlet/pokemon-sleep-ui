import {specialtyIdMap} from '@/const/game/pokemon';
import {PokemonIngredientPick} from '@/types/game/producing/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';


type GetIngredientPickOpts = {
  pokemon: PokemonInfo,
  randomIngredientPicks: PokemonIngredientPick[],
};

export const getIngredientPicks = ({
  pokemon,
  randomIngredientPicks,
}: GetIngredientPickOpts): PokemonIngredientPick[] => {
  const {ingredients, specialty} = pokemon;

  return [
    ...(
      ingredients.fixed ?
        [{level: 1, id: ingredients.fixed, quantity: specialty === specialtyIdMap.ingredient ? 2 : 1}] :
        []
    ),
    ...randomIngredientPicks,
  ];
};

import {PokemonComplexFilterOnSelectOpts} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type ToOnDeskStateOpts = PokemonComplexFilterOnSelectOpts & {
  chain: IngredientChain,
};

export const toOnDeskState = ({
  pokemon,
  ingredients,
  subSkill,
  nature,
  chain,
  origin,
}: ToOnDeskStateOpts): PokemonOnDeskState => {
  return {
    pokemon,
    ingredients: ingredients ?? generateIngredientProductionAtLevels(chain),
    subSkill: subSkill ?? {},
    nature: nature ?? null,
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
    origin,
  };
};

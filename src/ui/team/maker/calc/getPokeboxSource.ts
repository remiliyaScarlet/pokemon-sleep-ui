import {PokeInBox} from '@/types/userData/pokebox/main';
import {TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {generatePokeboxFromBase} from '@/utils/team/pokebox/generateFromBase';
import {isNotNullish} from '@/utils/type';


export const getPokeboxSource = ({
  ingredientChainMap,
  pokedexMap,
  input,
  pokeboxList,
}: TeamMakerCalcInitOpts): PokeInBox[] => {
  const {source} = input;

  if (source === 'pokebox') {
    return pokeboxList;
  }

  if (source === 'vanilla') {
    return generatePokeboxFromBase({
      ingredientChainMap,
      pokemonList: Object.values(pokedexMap).filter(isNotNullish),
      ...input.vanillaPresets,
    });
  }

  throw new Error(`Unhandled Team Maker pokebox source type: ${source satisfies never}`);
};

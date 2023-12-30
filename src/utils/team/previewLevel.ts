import {PokemonKeyLevel} from '@/types/game/pokemon/level';


type GetLevelToCalcForPokeInBoxOpts = {
  actualLevel: number,
  previewLevel: PokemonKeyLevel | null,
};

export const getLevelToCalcForPokeInBox = ({actualLevel, previewLevel}: GetLevelToCalcForPokeInBoxOpts) => {
  return Math.max(actualLevel, previewLevel ?? -Infinity);
};

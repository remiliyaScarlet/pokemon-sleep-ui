import {PokedexMap, PokemonId} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonExpData, PokemonExpMultiplierMap} from '@/types/game/pokemon/xp';


export type PokemonExpCalculatorDataProps = {
  pokedexMap: PokedexMap,
  xpData: PokemonExpData[],
  xpMultiplier: PokemonExpMultiplierMap,
  maxLevel: number,
};

export type PokemonExpCalculatorParams = {
  xpToNext: number,
  currentLv: number,
  ownedCandies: number,
};

export type PokemonExpCalculatorInput = PokemonExpCalculatorParams & {
  pokemon: PokemonId | null,
  nature: NatureId | null,
  showNonBreakthroughLevel: boolean,
};

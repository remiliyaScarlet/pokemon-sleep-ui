import {PokedexMap, PokemonId} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonExpData, PokemonExpMultiplierMap} from '@/types/game/pokemon/xp';


export type PokemonExpCalculatorDataProps = {
  pokedexMap: PokedexMap,
  xpData: PokemonExpData[],
  xpMultiplier: PokemonExpMultiplierMap,
  maxLevel: number,
};

export type PokemonExpCalculatorInput = {
  pokemon: PokemonId | null,
  nature: NatureId | null,
  currentLv: number,
  currentToNext: number,
  ownedCandies: number,
  showNonBreakthroughLevel: boolean,
};

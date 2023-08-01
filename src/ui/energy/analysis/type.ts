import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {BerryDataMap, BerryId} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokedexMap, PokemonId} from '@/types/mongo/pokemon';


export type EnergyAnalysisFilter = PokemonInputFilter<PokemonInputType> & {
  snorlaxFavorite: FilterInclusionMap<BerryId>,
};

export type EnergyAnalysisDataProps = {
  pokedex: PokedexMap,
  berryMap: BerryDataMap,
  ingredientMap: IngredientMap,
};

export const energyAnalysisSlotName = ['A', 'B', 'C', 'D', 'E'] as const;

export type EnergyAnalysisSlotName = typeof energyAnalysisSlotName[number];

export type EnergyAnalysisMember = {
  pokemonId: PokemonId,
  level: number,
};

export type EnergyAnalysisTeamSelection = {
  team: {[slot in EnergyAnalysisSlotName]: EnergyAnalysisMember | null},
  ingredientBonusPercent: number,
};

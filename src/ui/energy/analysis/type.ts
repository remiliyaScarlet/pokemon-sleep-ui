import {FilterInclusionMap, FilterInputProps} from '@/components/input/filter/type';
import {PokemonInputFilter, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {BerryDataMap, BerryId} from '@/types/mongo/berry';
import {PokedexMap, PokemonId, PokemonInfo} from '@/types/mongo/pokemon';


export const energyAnalysisSlotNames = ['A', 'B', 'C', 'D', 'E'] as const;

export type EnergyAnalysisSlotNames = typeof energyAnalysisSlotNames[number];

export type EnergyAnalysisSlot = {
  pokemonId: PokemonId,
  level: number,
};

export type EnergyAnalysisFilter = PokemonInputFilter<PokemonInputType> & {
  team: {[slot in EnergyAnalysisSlotNames]: EnergyAnalysisSlot | null},
  snorlaxFavorite: FilterInclusionMap<BerryId>,
};

export type EnergyAnalysisInputProps = FilterInputProps<EnergyAnalysisFilter> & {
  pokemon: PokemonInfo[],
};

export type EnergyAnalysisProps = {
  pokedex: PokedexMap,
  berryMap: BerryDataMap,
};

export type EnergyAnalysisTeam = {
  team: {[slot in EnergyAnalysisSlotNames]: EnergyAnalysisSlot | null},
};

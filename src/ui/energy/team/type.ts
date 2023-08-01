import {FilterInclusionMap, FilterInputProps} from '@/components/input/filter/type';
import {PokemonInputFilter, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {BerryDataMap, BerryId} from '@/types/mongo/berry';
import {PokedexMap, PokemonId, PokemonInfo} from '@/types/mongo/pokemon';


export const energyTeamSlotNames = ['A', 'B', 'C', 'D', 'E'] as const;

export type EnergyTeamSlotNames = typeof energyTeamSlotNames[number];

export type EnergyTeamSlot = {
  pokemonId: PokemonId,
  level: number,
};

export type EnergyTeamFilter = PokemonInputFilter<PokemonInputType> & {
  team: {[slot in EnergyTeamSlotNames]: EnergyTeamSlot | null},
  snorlaxFavorite: FilterInclusionMap<BerryId>,
};

export type EnergyTeamInputProps = FilterInputProps<EnergyTeamFilter> & {
  pokemon: PokemonInfo[],
};

export type EnergyTeamProps = {
  pokedex: PokedexMap,
  berryMap: BerryDataMap,
};

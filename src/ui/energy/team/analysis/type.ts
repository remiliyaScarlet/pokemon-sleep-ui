import {FilterInputProps} from '@/components/input/filter/type';
import {ProductionRate} from '@/types/game/pokemon';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {EnergyTeamProps, EnergyTeamFilter, EnergyTeamSlot, EnergyTeamSlotNames} from '@/ui/energy/team/type';


export type IngredientProductionStats = {
  quantity: ProductionRate,
  energy: ProductionRate,
};

export type ProductionStatsSingle = {
  berry: ProductionRate,
};

export type ProductionStatsBySlot = {[slot in EnergyTeamSlotNames]: ProductionStatsSingle | null};

export type ProductionStats = {
  bySlot: ProductionStatsBySlot,
  total: ProductionStatsSingle,
};

export type EnergyAnalysisPokemonProps =
  FilterInputProps<EnergyTeamFilter> &
  Pick<EnergyTeamProps, 'berryMap'> & {
    slotName: EnergyTeamSlotNames,
  } & ({
    slot: EnergyTeamSlot,
    pokemon: PokemonInfo,
    productionStats: ProductionStatsSingle,
  } | {
    slot: null,
    pokemon: undefined,
    productionStats: null,
  });

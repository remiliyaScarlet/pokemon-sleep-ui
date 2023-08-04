import {ProducingRate} from '@/types/game/producing/rate';


export const applyEnergyMultiplier = <T extends ProducingRate | null>(multiplier: number, data: T): T => {
  if (!data) {
    return data;
  }

  return {
    ...data,
    dailyEnergy: data.dailyEnergy * multiplier,
  };
};

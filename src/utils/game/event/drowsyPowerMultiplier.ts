import {defaultDrowsyPowerMultiplier} from '@/const/game/event';
import {EventDrowsyPowerMultiplierData} from '@/types/game/event/drowsyPowerMultiplier';


export const getCurrentDrowsyPowerMultiplier = ({entries}: EventDrowsyPowerMultiplierData): number => {
  if (!entries.length) {
    return defaultDrowsyPowerMultiplier;
  }

  const now = Date.now() / 1000;
  const dataInRange = entries.find(({startEpoch, endEpoch}) => now >= startEpoch && now <= endEpoch);

  return dataInRange?.multiplier ?? defaultDrowsyPowerMultiplier;
};

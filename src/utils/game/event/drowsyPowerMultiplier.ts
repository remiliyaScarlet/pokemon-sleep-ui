import {defaultDrowsyPowerMultiplier} from '@/const/game/event';
import {EventDrowsyPowerMultiplierData} from '@/types/game/event/drowsyPowerMultiplier';


export const getCurrentDrowsyPowerMultiplier = ({entries}: EventDrowsyPowerMultiplierData): number => {
  if (!entries.length) {
    return defaultDrowsyPowerMultiplier;
  }

  const now = Date.now() / 1000;
  const multiplierFromData = entries.find(({startEpoch, endEpoch}) => now >= startEpoch && now <= endEpoch)?.multiplier;

  return multiplierFromData ?? defaultDrowsyPowerMultiplier;
};

import {SnorlaxRank} from '@/types/game/rank';
import {SnorlaxRankData} from '@/types/mongo/snorlax';


type GetSnorlaxRankAtEnergyProps = {
  energy: number,
  data: SnorlaxRankData[],
};

export const getSnorlaxRankAtEnergy = ({energy, data}: GetSnorlaxRankAtEnergyProps): SnorlaxRankData | undefined => {
  const sorted = data.sort((a, b) => b.energy - a.energy);

  return sorted.find((rankData) => rankData.energy < energy) ?? sorted.at(-1);
};

export const isSameRank = (a: SnorlaxRank, b: SnorlaxRank): boolean => a.title === b.title && a.number === b.number;

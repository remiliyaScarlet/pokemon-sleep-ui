import {BerryData} from '@/types/mongo/berry';


type GetBerryEnergyInfoOpts = {
  berryData: BerryData,
  level: number,
};

export const getBerryEnergyInfo = ({berryData, level}: GetBerryEnergyInfoOpts) => {
  const atLevel = berryData.energy[level - 1];
  const energyLv1 = berryData.energy.at(0);

  return {
    atLevel,
    diffVal: atLevel.energy - (energyLv1?.energy ?? 0),
    diffPct: atLevel.energy / (energyLv1?.energy ?? 0) * 100 - 100,
  };
};

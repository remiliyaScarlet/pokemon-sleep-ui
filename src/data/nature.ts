import nature from '@/data/nature.json';
import {NatureData, NatureDataMap} from '@/types/game/pokemon/nature';


export const natureData: NatureData[] = nature as NatureData[];

export const natureDataMap: NatureDataMap = Object.fromEntries(
  natureData.map((data) => [data.id, data]),
);

import {ProduceType} from '@/types/game/producing/common';
import {ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProducingSleepStateSplit} from '@/types/game/producing/split';


export type GetItemRateOfSessionCommonOpts = {
  rate: ProducingRateOfItemOfSessions,
  produceType: ProduceType,
};

export type GetSpecificItemRateOfSessionCommonOpts = GetItemRateOfSessionCommonOpts & {
  produceItemSplit: number,
  sleepStateSplit: ProducingSleepStateSplit,
};

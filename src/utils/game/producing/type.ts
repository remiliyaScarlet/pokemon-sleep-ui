import {ProduceType} from '@/types/game/producing/common';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProducingSleepStateSplit} from '@/types/game/producing/split';


export type GetItemRateOfSessionCommonOpts = {
  period: ProductionPeriod,
  rate: ProducingRateOfItemOfSessions,
  produceType: ProduceType,
};

export type GetSpecificItemRateOfSessionCommonOpts = GetItemRateOfSessionCommonOpts & {
  produceItemSplit: number,
  sleepStateSplit: ProducingSleepStateSplit,
};

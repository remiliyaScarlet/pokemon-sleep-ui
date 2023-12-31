import {SleepdexLookupDataEntry, SleepdexLookupSortType} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';


export const sleepdexLookupEntriesSortBasisGetter: {
  [sort in SleepdexLookupSortType]: (entry: SleepdexLookupDataEntry) => number
} = {
  drowsyPowerRequirements: ({spoRequirement}) => spoRequirement.drowsyScore,
  shards: ({sleepStyle}) => sleepStyle.rewards.shards,
  researchExp: ({sleepStyle}) => sleepStyle.rewards.exp,
};

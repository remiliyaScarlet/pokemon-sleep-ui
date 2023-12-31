import {FilterInclusionMap} from '@/components/input/filter/type';
import {SleepdexStyleId} from '@/types/game/sleepdex';
import {
  SleepdexLookupDataEntry,
  SleepdexLookupSortType,
} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';


export type SleepdexLookupDataCalcWorkerOpts = {
  entries: SleepdexLookupDataEntry[],
  isIncluded: FilterInclusionMap<SleepdexStyleId>,
  sort: SleepdexLookupSortType,
};

import {SleepdexLookupDisplayType} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {SleepdexLookupServerDataProps} from '@/ui/sleepStyle/sleepdex/lookup/type';


export type SleepdexLookupResultCommonProps = SleepdexLookupServerDataProps & {
  display: SleepdexLookupDisplayType,
};

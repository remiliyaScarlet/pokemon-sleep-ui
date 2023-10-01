import {SleepdexMap} from '@/types/game/sleepdex';
import {FieldToSleepStyleFlattenedMap, SleepMapId} from '@/types/game/sleepStyle';


export type MapIndexSleepdexCompletionProps = {
  data: FieldToSleepStyleFlattenedMap,
  sleepdexMap: SleepdexMap,
};

export type MapIndexSleepdexCompletionOfMap = {
  completed: number,
  total: number,
};

export type MapIndexSleepdexCompletion = {[id in SleepMapId]?: MapIndexSleepdexCompletionOfMap};

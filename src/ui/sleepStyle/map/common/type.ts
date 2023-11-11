import {SleepdexMap} from '@/types/game/sleepdex';
import {FieldToFlattenedSleepStyleMap, SleepMapId} from '@/types/game/sleepStyle';


export type MapIndexSleepdexCompletionProps = {
  data: FieldToFlattenedSleepStyleMap,
  sleepdexMap: SleepdexMap,
};

export type MapIndexSleepdexCompletionOfMap = {
  completed: number,
  total: number,
};

export type MapIndexSleepdexCompletion = {[id in SleepMapId]?: MapIndexSleepdexCompletionOfMap};

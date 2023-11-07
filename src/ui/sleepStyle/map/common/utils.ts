import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleDataFlattened} from '@/types/game/sleepStyle';
import {
  MapIndexSleepdexCompletion,
  MapIndexSleepdexCompletionOfMap,
  MapIndexSleepdexCompletionProps,
} from '@/ui/sleepStyle/map/common/type';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';


type GetSleepdexCompletionOfMapOpts = {
  sleepStyles: SleepStyleDataFlattened[] | undefined,
  sleepdexMap: SleepdexMap,
};

export const getSleepdexCompletionOfMap = ({
  sleepStyles,
  sleepdexMap,
}: GetSleepdexCompletionOfMapOpts): MapIndexSleepdexCompletionOfMap => {
  let accumulator: MapIndexSleepdexCompletionOfMap = {
    completed: 0,
    total: 0,
  };

  for (const {pokemonId, style} of (sleepStyles ?? [])) {
    const sleepStyleId = toSleepdexStyleId({pokemonId, styleId: style.style});

    const inSleepdex = sleepdexMap[sleepStyleId];

    accumulator = {
      completed: accumulator.completed + (inSleepdex ? 1 : 0),
      total: accumulator.total + 1,
    };
  }

  return accumulator;
};

export const getSleepdexCompletion = ({
  data,
  sleepdexMap,
}: MapIndexSleepdexCompletionProps): MapIndexSleepdexCompletion => {
  return Object.fromEntries(Object.entries(data).map(([mapId, sleepStyles]) => [
    mapId,
    getSleepdexCompletionOfMap({sleepStyles, sleepdexMap}),
  ]));
};

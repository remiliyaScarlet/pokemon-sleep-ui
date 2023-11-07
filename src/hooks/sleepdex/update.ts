import {SleepdexUpdater, UpdateSleepdexOpts, UseUpdateSleepdexOpts} from '@/hooks/sleepdex/type';
import {useUserDataActor} from '@/hooks/userData/actor';
import {SleepdexData} from '@/types/game/sleepdex';
import {isInSleepdex, toSleepdexStyleId} from '@/utils/game/sleepdex';


export const useUpdateSleepdex = ({sleepdex, setSleepdex}: UseUpdateSleepdexOpts): SleepdexUpdater => {
  const {act} = useUserDataActor({statusToast: true});

  return (opts: UpdateSleepdexOpts) => {
    const {pokemonId, styleId} = opts;

    if (!act) {
      return;
    }

    const sleepdexId = toSleepdexStyleId({pokemonId, styleId});
    const inSleepdex = isInSleepdex({sleepdex, ...opts});
    const sleepdexData: SleepdexData = {pokemonId, styleId};

    act({
      action: 'upload',
      options: {
        type: inSleepdex ? 'sleepdex.unmark' : 'sleepdex.mark',
        data: sleepdexData,
      },
    });
    setSleepdex((original) => {
      if (!inSleepdex) {
        return {...original, [sleepdexId]: sleepdexData};
      }

      const updated = {...original};
      delete updated[sleepdexId];

      return updated;
    });
  };
};

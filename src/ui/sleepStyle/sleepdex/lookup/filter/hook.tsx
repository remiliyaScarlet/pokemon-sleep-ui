import {useFilterInput} from '@/components/input/filter/hook';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {SleepdexStyleId} from '@/types/game/sleepdex';
import {SleepdexLookupDataEntry, SleepdexLookupFilter} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {SleepdexLookupServerDataProps} from '@/ui/sleepStyle/sleepdex/lookup/type';
import {getCurrentDrowsyPowerMultiplier} from '@/utils/game/event/drowsyPowerMultiplier';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';
import {getSleepStyleMerged, getSpoRequirement} from '@/utils/game/sleepStyle';
import {isNotNullish} from '@/utils/type';


export const useSleepdexLookupFilter = ({
  sleepStyles,
  pokedexMap,
  eventDrowsyPowerMultiplierData,
  ...filterData
}: SleepdexLookupServerDataProps) => {
  return useFilterInput<SleepdexLookupFilter, SleepdexLookupDataEntry, SleepdexStyleId>({
    data: ({drowsyPowerMultiplier}) => getSleepStyleMerged(sleepStyles)
      .map((sleepStyle): SleepdexLookupDataEntry | null => {
        const {pokemonId, spo, style} = sleepStyle;
        const pokemon = pokedexMap[pokemonId];

        if (!pokemon) {
          return null;
        }

        return {
          sleepdexStyleId: toSleepdexStyleId({
            pokemonId,
            styleId: style,
          }),
          sleepStyle,
          spoRequirement: getSpoRequirement({
            spo,
            drowsyPowerMultiplier,
          }),
          pokemon,
        };
      })
      .filter(isNotNullish),
    dataToId: ({sleepStyle}) => toSleepdexStyleId({
      pokemonId: sleepStyle.pokemonId,
      styleId: sleepStyle.style,
    }),
    initialFilter: {
      ...generatePokemonInputFilter({isLevelAgnostic: true}),
      mapId: null,
      drowsyPowerMultiplier: getCurrentDrowsyPowerMultiplier(eventDrowsyPowerMultiplierData),
      drowsyPowerRequirement: 0,
      incenseOnly: false,
      display: 'drowsyPowerRequirements',
      sort: 'drowsyPowerRequirements',
    },
    isDataIncluded: (filter, data) => {
      if (filter.mapId !== null && !data.sleepStyle.mapIds.includes(filter.mapId)) {
        return false;
      }

      if (filter.incenseOnly && !data.sleepStyle.incenseOnly) {
        return false;
      }

      if (data.spoRequirement.drowsyScore < filter.drowsyPowerRequirement) {
        return false;
      }

      return isPokemonIncludedFromFilter({
        filter,
        pokemon: data.pokemon,
        ...filterData,
      });
    },
  });
};

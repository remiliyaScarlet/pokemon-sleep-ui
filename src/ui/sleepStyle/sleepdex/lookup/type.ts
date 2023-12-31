import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {EventDrowsyPowerMultiplierData} from '@/types/game/event/drowsyPowerMultiplier';
import {PokedexMap} from '@/types/game/pokemon';
import {PokemonBranchMapByLeaf} from '@/types/game/pokemon/branch';
import {SleepMapId, SleepStyleNormalFlattened, SleepStyleSpecial} from '@/types/game/sleepStyle';


export type SleepdexLookupServerDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  pokemonBranchMapByLeaf: PokemonBranchMapByLeaf,
  eventDrowsyPowerMultiplierData: EventDrowsyPowerMultiplierData,
  sleepStyles: {
    normal: SleepStyleNormalFlattened[],
    special: SleepStyleSpecial[],
  },
  mapIds: SleepMapId[],
};

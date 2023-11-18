import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {UserSettings} from '@/types/userData/settings';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {
  getProducingRateImplicitParamsFromPokeInbox,
  getProducingRateSingleParams,
} from '@/utils/game/producing/params';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {isNotNullish} from '@/utils/type';
import {toCalculatedUserSettings} from '@/utils/user/settings';


type Props = PokeboxCommonProps & {
  pokebox: Pokebox,
  pokeInBoxToCalc: PokeInBox[],
  filter: PokeboxViewerFilter,
  settings: UserSettings,
  isIncluded: FilterInclusionMap<PokeInBox['uuid']>,
  setLoading: (loading: boolean) => void,
};

export const useProcessedPokebox = ({
  pokebox,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
  pokeInBoxToCalc,
  filter,
  settings,
  isIncluded,
  setLoading,
}: Props) => useSortingWorker({
  data: pokeInBoxToCalc
    .filter(({uuid}) => isIncluded[uuid])
    .map((pokeInBox) => {
      const pokemon = pokedexMap[pokeInBox.pokemon];

      if (!pokemon) {
        return null;
      }

      const {level, dateAdded} = pokeInBox;
      const singleParams = getProducingRateSingleParams({
        ...pokeInBox,
        subSkillMap,
        helpingBonusSimulateOnSelf: true,
      });

      return {
        pokemon,
        pokemonProducingParams: getPokemonProducingParams({
          pokemonId: pokemon.id,
          pokemonProducingParamsMap,
        }),
        level,
        dateAdded,
        extra: pokeInBox,
        ingredients: getEffectiveIngredientProductions({level, ingredients: pokeInBox.ingredients}),
        calculatedSettings: toCalculatedUserSettings({
          settings,
          recoveryRate: toRecoveryRate(singleParams),
        }),
        ...singleParams,
        ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
      } satisfies PokemonInfoWithSortingPayload<PokeInBox>;
    })
    .filter(isNotNullish),
  sort: filter.sort,
  snorlaxFavorite: filter.snorlaxFavorite,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  // Cannot use `pokeInBoxToCalc` as re-calc dependency here, as it is always a new object after each calculation
  triggerDeps: [pokebox, filter, settings],
  setLoading,
});

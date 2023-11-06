import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {UserSettings} from '@/types/userData/settings';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {isNotNullish} from '@/utils/type';
import {toCalculatedUserSettings} from '@/utils/user/settings';


type Props = PokeboxCommonProps & {
  pokebox: Pokebox,
  pokeboxForCalc: Pokebox,
  filter: PokeboxViewerFilter,
  settings: UserSettings,
  isIncluded: FilterInclusionMap<PokeInBox['uuid']>,
  setLoading: (loading: boolean) => void,
};

export const useFilteredSortedPokebox = ({
  pokedexMap,
  pokemonProducingParamsMap,
  subSkillMap,
  ingredientMap,
  berryDataMap,
  pokebox,
  pokeboxForCalc,
  filter,
  settings,
  isIncluded,
  setLoading,
}: Props) => {
  return useSortingWorker({
    data: Object.values(pokeboxForCalc)
      .filter(isNotNullish)
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
          evolutionCount: pokeInBox.evolutionCount,
          ingredients: getEffectiveIngredientProductions({level, ingredients: pokeInBox.ingredients}),
          ...singleParams,
          calculatedSettings: toCalculatedUserSettings({
            settings,
            recoveryRate: toRecoveryRate(singleParams),
          }),
        } satisfies PokemonInfoWithSortingPayload<PokeInBox>;
      })
      .filter(isNotNullish),
    sort: filter.sort,
    snorlaxFavorite: filter.snorlaxFavorite,
    ingredientMap,
    berryDataMap,
    triggerDeps: [pokebox, filter, settings],
    setLoading,
  });
};

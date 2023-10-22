import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  pokebox: Pokebox,
  pokeboxForCalc: Pokebox,
  filter: PokeboxViewerFilter,
  calculatedSettings: CalculatedUserSettings,
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
  calculatedSettings,
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
          ...getProducingRateSingleParams({
            ...pokeInBox,
            subSkillMap,
            helpingBonusSimulateOnSelf: true,
          }),
        } satisfies PokemonInfoWithSortingPayload<PokeInBox>;
      })
      .filter(isNotNullish),
    sort: filter.sort,
    snorlaxFavorite: filter.snorlaxFavorite,
    ingredientMap,
    berryDataMap,
    calculatedSettings,
    triggerDeps: [pokebox, filter, calculatedSettings],
    setLoading,
  });
};

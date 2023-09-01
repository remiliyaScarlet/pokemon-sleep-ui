import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  pokebox: Pokebox,
  filter: PokeboxViewerFilter,
  isIncluded: FilterInclusionMap<PokeInBox['uuid']>,
  setLoading: (loading: boolean) => void,
};

export const useFilteredSortedPokebox = ({
  pokebox,
  filter,
  isIncluded,
  setLoading,
  pokedexMap,
  subSkillMap,
  ingredientMap,
  berryDataMap,
}: Props) => {
  return useSortingWorker({
    data: Object.values(pokebox)
      .filter(isNotNullish)
      .filter(({uuid}) => isIncluded[uuid])
      .map((pokeInBox) => {
        const pokemon = pokedexMap[pokeInBox.pokemon];

        if (!pokemon) {
          return null;
        }

        const {level} = pokeInBox;

        return {
          pokemon,
          level,
          extra: pokeInBox,
          ingredients: getEffectiveIngredientProductions({level, ingredients: pokeInBox.ingredients}),
          ...getProducingRateSingleParams({...pokeInBox, subSkillMap}),
        };
      })
      .filter(isNotNullish) satisfies PokemonInfoWithSortingPayload<PokeInBox>[],
    sort: filter.sort,
    snorlaxFavorite: filter.snorlaxFavorite,
    userBonus: {
      ingredient: filter.bonus.ingredient,
      overall: 0,
    },
    ingredientMap,
    berryDataMap,
    triggerDeps: [pokebox, filter],
    setLoading,
  });
};

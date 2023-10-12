import {GetSkillTriggerValueCommonOpts} from '@/ui/team/mainskill/calc/type';
import {SkillTriggerAnalysisCalculatedUnit} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';
import {getSkillTriggerValue} from '@/utils/game/mainSkill/utils';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getSubSkillBonus} from '@/utils/game/subSkill';


type GetSkillTriggerValueOfUnitOpts = GetSkillTriggerValueCommonOpts & {
  id: string,
  unit: SkillTriggerAnalysisUnit,
  baseValue: number | null,
};

export const getSkillTriggerValueOfUnit = ({
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  subSkillMap,
  calculatedSettings,
  id,
  unit,
  baseValue,
} :GetSkillTriggerValueOfUnitOpts): SkillTriggerAnalysisCalculatedUnit | null => {
  const {
    level,
    pokemonId,
    nature,
    subSkill,
    ingredients,
  } = unit;

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return null;
  }

  const {berry} = pokemon;

  const pokemonProducingParams = getPokemonProducingParams({
    pokemonId,
    pokemonProducingParamsMap,
  });

  const subSkillBonus = getSubSkillBonus({level, pokemonSubSkill: subSkill, subSkillMap});

  const rate = getPokemonProducingRate({
    // `unit` could have `pokemon` from Poke-in-box, therefore it should always be at the top
    ...unit,
    ...getProducingRateSingleParams({
      level,
      subSkill,
      nature,
      subSkillMap,
    }),
    ...calculatedSettings,
    pokemon,
    snorlaxFavorite: {},
    berryData: berryDataMap[berry.id],
    ingredientMap,
    pokemonProducingParams,
    ingredients: getEffectiveIngredientProductions({level, ingredients}),
  });

  const actual = getSkillTriggerValue({
    rate,
    skillValue: pokemonProducingParams.skillValue,
    natureId: nature,
    subSkillBonus,
  });

  return {
    ...unit,
    id,
    skillTriggerValue: {
      actual,
      ratioToBase: baseValue ? actual / baseValue : 1,
    },
  };
};

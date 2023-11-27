import {GetSkillTriggerValueCommonOpts} from '@/ui/team/mainskill/calc/type';
import {SkillTriggerAnalysisCalculatedUnit} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';
import {getSkillTriggerValue} from '@/utils/game/mainSkill/utils';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getPokemonProducingParams, getProducingRateSingleParams} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {getSubSkillBonus} from '@/utils/game/subSkill/effect';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';
import {toSynergizedUserSettings} from '@/utils/user/settings/synergized';


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
  mainSkillMap,
  subSkillMap,
  mealMap,
  bundle,
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

  const {berry, skill} = pokemon;

  const pokemonProducingParams = getPokemonProducingParams({
    pokemonId,
    pokemonProducingParamsMap,
  });
  const subSkillBonus = getSubSkillBonus({level, pokemonSubSkill: subSkill, subSkillMap});
  const singleParams = getProducingRateSingleParams({
    level,
    subSkill,
    nature,
    subSkillMap,
  });

  const rate = getPokemonProducingRateSingle({
    // `unit` could have `pokemon` from Poke-in-box, therefore it should always be at the top
    ...unit,
    ...singleParams,
    ...toCalculatedUserSettings({
      ...bundle,
      recoveryRate: toRecoveryRate(singleParams),
    }),
    ...toSynergizedUserSettings({
      ...bundle,
      mealMap,
    }),
    pokemon,
    snorlaxFavorite: {},
    berryData: berryDataMap[berry.id],
    ingredientMap,
    skillData: mainSkillMap[skill],
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

import {ProducingRateSingleParams} from '@/types/game/producing/rate';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {UseTeamProducingStatsOpts} from '@/ui/team/analysis/calcHook/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {GetPokemonProducingRateBaseOpts} from '@/utils/game/producing/main/base';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/type';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {getSubSkillBonus} from '@/utils/game/subSkill/effect';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';


type GetTeamProducingStatsSlotOpts = UseTeamProducingStatsOpts & {
  slotName: TeamAnalysisSlotName,
  helperCount: number,
};

type GetProducingStatsOptsSlotReturn = {
  rateOpts: Omit<GetPokemonProducingRateBaseOpts, keyof GetProducingRateSharedOpts>,
  calculatedSettings: CalculatedUserSettings,
};

export const getTeamProducingStatsSlot = ({
  setup,
  bundle,
  slotName,
  helperCount,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
}: GetTeamProducingStatsSlotOpts): GetProducingStatsOptsSlotReturn | null => {
  const {
    members,
  } = getCurrentTeam({setup});

  // return React.useMemo(() => {
  const member = members[slotName];
  if (!member) {
    return null;
  }

  const {
    level,
    pokemonId,
    ingredients,
    evolutionCount,
    subSkill,
    nature,
    seeds,
    alwaysFullPack,
  } = member;

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return null;
  }

  const singleParams: ProducingRateSingleParams = {
    helperCount,
    subSkillBonus: getSubSkillBonus({
      level,
      pokemonSubSkill: subSkill,
      subSkillMap,
    }),
    natureId: nature,
  };
  const calculatedSettings = toCalculatedUserSettings({
    ...bundle,
    recoveryRate: toRecoveryRate(singleParams),
    behaviorOverride: alwaysFullPack != null ? {alwaysFullPack: alwaysFullPack ? 'always' : 'disable'} : {},
  });

  return {
    rateOpts: {
      ...singleParams,
      ...calculatedSettings,
      level,
      pokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokemon.id,
        pokemonProducingParamsMap,
      }),
      berryData: berryDataMap[pokemon.berry.id],
      ingredients: getEffectiveIngredientProductions({level, ingredients}),
      ingredientMap,
      skillData: mainSkillMap[pokemon.skill],
      evolutionCount,
      seeds,
    },
    calculatedSettings,
  };
};

import {PokeInBox} from '@/types/game/pokebox';
import {TeamAnalysisMember} from '@/ui/team/analysis/type';


export const toTeamAnalysisMember = ({
  name,
  level,
  pokemon,
  nature,
  subSkill,
  ingredients,
  carryLimit,
}: PokeInBox): TeamAnalysisMember => {
  return {
    name,
    level,
    pokemonId: pokemon,
    nature,
    subSkill,
    ingredients,
    carryLimit,
  };
};

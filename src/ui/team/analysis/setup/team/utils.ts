import {PokeInBox} from '@/types/game/pokebox';
import {TeamAnalysisMember} from '@/ui/team/analysis/type';


export const toTeamAnalysisMember = ({
  name,
  level,
  pokemon,
  nature,
  subSkill,
  ingredients,
}: PokeInBox): TeamAnalysisMember => {
  return {
    name,
    level,
    pokemonId: pokemon,
    nature,
    subSkill,
    ingredients,
  };
};

import {PokeInBox} from '@/types/game/pokebox';
import {TeamAnalysisMember} from '@/ui/team/analysis/type';


export const toTeamAnalysisMember = ({level, pokemon, nature, subSkill}: PokeInBox): TeamAnalysisMember => {
  return {
    level,
    pokemonId: pokemon,
    nature,
    subSkill,
  };
};

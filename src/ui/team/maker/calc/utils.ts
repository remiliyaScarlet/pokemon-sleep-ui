import {teamMakerMaxResultCount} from '@/ui/team/maker/const';
import {TeamMakerResultComp} from '@/ui/team/maker/type';


export const reduceTeamMakerResultComp = (comps: TeamMakerResultComp[]): TeamMakerResultComp[] => {
  return comps
    .sort((a, b) => b.strength.total - a.strength.total)
    .slice(0, teamMakerMaxResultCount);
};

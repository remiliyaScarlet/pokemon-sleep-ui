import {createUserDataManager} from '@/controller/user/common';
import {CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


export const userDataRecipeLevel = createUserDataManager<CookingFilterRecipeLevel>('recipeLevel');

export const userDataTeamAnalysisSetup = createUserDataManager<TeamAnalysisTeamSetup>('teamAnalysisSetup');

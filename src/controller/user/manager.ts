import {createUserDataManager} from '@/controller/user/common';
import {MealTypeId} from '@/types/mongo/meal';
import {CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


export const userDataRecipeLevel = createUserDataManager<CookingFilterRecipeLevel>('recipeLevel');

export const userDataTeamAnalysisSetup = createUserDataManager<TeamAnalysisTeamSetup>('teamAnalysisSetup');

export const userDataPokedex = createUserDataManager<PokedexDisplay>('pokedex');

export const userDataPotCapacity = createUserDataManager<number>('potCapacity');

export const userDataMealType = createUserDataManager<MealTypeId>('mealType');

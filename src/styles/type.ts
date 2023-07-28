import {MealTypeId} from '@/types/mongo/meal';
import {PokemonSleepTypeId} from '@/types/mongo/pokemon';


export type SleepTypeClassMap = {[id in PokemonSleepTypeId]: string};

export type MealTypeClassMap = {[type in MealTypeId]: string};

import {MealTypeId} from '@/types/mongo/meal';
import {PokemonSleepTypeId, PokemonSpecialtyId} from '@/types/mongo/pokemon';


export type SleepTypeClassMap = {[id in PokemonSleepTypeId]: string};

export type MealTypeClassMap = {[type in MealTypeId]: string};

export type SpecialtyClassMap = {[type in PokemonSpecialtyId]: string};

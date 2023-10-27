import {MealTypeId} from '@/types/game/meal/main';
import {PokemonSleepTypeId, PokemonSpecialtyId} from '@/types/game/pokemon';


export type SleepTypeClassMap = {[id in PokemonSleepTypeId]: string};

export type MealTypeClassMap = {[type in MealTypeId]: string};

export type SpecialtyClassMap = {[type in PokemonSpecialtyId]: string};

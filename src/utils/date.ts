import {IsoDateString} from '@/types/date';


export const toIsoDateString = (date: Date): IsoDateString => date.toISOString().slice(0, 10) as IsoDateString;

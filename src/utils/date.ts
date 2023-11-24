import {IsoDateString, IsoTimestampString} from '@/types/date';


export const toIsoDateString = (date: Date): IsoDateString => date.toISOString().slice(0, 10) as IsoDateString;

export const toIsoTimestampString = (date: Date): IsoTimestampString => (
  date.toISOString().slice(0, -1) as IsoTimestampString
);

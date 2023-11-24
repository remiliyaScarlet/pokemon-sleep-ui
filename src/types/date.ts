export type IsoDateString = `${number}-${number}-${number}`;

export type IsoTimestampString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}`;

export type IsoUtcTimestampString = `${IsoTimestampString}+00:00`;

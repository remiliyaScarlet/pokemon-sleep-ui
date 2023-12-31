export type EventDrowsyPowerMultiplierEntry = {
  entryId: number,
  multiplier: number,
  startEpoch: number,
  endEpoch: number,
};

export type EventDrowsyPowerMultiplierData = {
  entries: EventDrowsyPowerMultiplierEntry[],
  max: number,
};

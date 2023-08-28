export type UserDataLoadingOpts = {
  type: 'teamAnalysisSetup'
} | {
  type: 'pokebox'
} | {
  type: 'pokeboxSorted'
};

export type UserDataLoader = (options: UserDataLoadingOpts) => void;

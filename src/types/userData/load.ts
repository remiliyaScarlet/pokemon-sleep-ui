export type UserDataLoadingOpts = {
  type: 'teamAnalysisSetup'
} | {
  type: 'pokebox'
};

export type UserDataLoader = (options: UserDataLoadingOpts) => void;

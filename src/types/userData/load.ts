export type UserDataLoadingOpts = {
  type: 'teamAnalysisSetup'
};

export type UserDataLoader = (options: UserDataLoadingOpts) => void;

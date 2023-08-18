import {UserDataLoadingOpts} from '@/types/userData/load';
import {UploadOfTeamAnalysisSetup} from '@/types/userData/upload';


export type UserLazyLoadedDataType = UserDataLoadingOpts['type'];

export type UserLazyLoadedContent = {
  teamAnalysisSetup: UploadOfTeamAnalysisSetup,
};

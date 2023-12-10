import {scanActivationInDatabase} from '@/handler/call/activation/poll/scan/common/activation';
import {MemberScanCommonOpts} from '@/handler/call/activation/poll/scan/common/type';
import {ActivationScanResult} from '@/handler/call/activation/poll/scan/type';
import {GithubSponsorData} from '@/types/subscription/github/data';


export const scanGithubActivationInDatabase = (
  opts: MemberScanCommonOpts<GithubSponsorData>,
): ActivationScanResult<GithubSponsorData> => {
  return scanActivationInDatabase({
    ...opts,
    source: 'github',
    isMemberActive: () => true,
    isMemberMatchesActivation: ({user}, {contact}) => (
      user.login === contact.github
    ),
  });
};

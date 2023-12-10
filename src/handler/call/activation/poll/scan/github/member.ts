import {scanMemberOnPlatform} from '@/handler/call/activation/poll/scan/common/platform';
import {MemberScanCommonOpts} from '@/handler/call/activation/poll/scan/common/type';
import {ActivationScanResult} from '@/handler/call/activation/poll/scan/type';
import {GithubSponsorData} from '@/types/subscription/github/data';


export const scanGithubSponsors = (
  opts: MemberScanCommonOpts<GithubSponsorData>,
): ActivationScanResult<GithubSponsorData> => {
  return scanMemberOnPlatform({
    ...opts,
    source: 'github',
    isMemberActive: () => true,
    isActivationBelongToMember: ({contact}, {user}) => (
      contact.github === user.login
    ),
  });
};

import {scanMemberOnPlatform} from '@/handler/call/activation/poll/scan/common/platform';
import {MemberScanCommonOpts} from '@/handler/call/activation/poll/scan/common/type';
import {ActivationScanResult} from '@/handler/call/activation/poll/scan/type';
import {DiscordSubscriber} from '@/types/subscription/discord/data';


export const scanDiscordSubscribers = (
  opts: MemberScanCommonOpts<DiscordSubscriber>,
): ActivationScanResult<DiscordSubscriber> => {
  return scanMemberOnPlatform({
    ...opts,
    source: 'discord',
    isMemberActive: () => true,
    isActivationBelongToMember: ({contact}, {userId}) => (
      contact.discord === userId
    ),
  });
};

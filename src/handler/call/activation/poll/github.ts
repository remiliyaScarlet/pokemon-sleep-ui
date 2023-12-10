import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {getAllActivationsOfSource} from '@/controller/user/activation/util';
import {actionSendActivationEmail} from '@/handler/action/activation/email';
import {scanGithubActivationInDatabase} from '@/handler/call/activation/poll/scan/github/activation';
import {scanGithubSponsors} from '@/handler/call/activation/poll/scan/github/member';
import {scanActivations} from '@/handler/call/activation/poll/scan/main';
import {mergeScanResult} from '@/handler/call/activation/poll/scan/utils';
import {getGithubSponsorships} from '@/handler/shared/github/api';
import {toActivationPayloadFromGithub} from '@/handler/shared/github/utils';


export const callGithubActivationPoll = async () => {
  const [
    members,
    activations,
    presetLookup,
  ] = await Promise.all([
    getGithubSponsorships(),
    getAllActivationsOfSource('github'),
    getActivationPresetLookupOfSource('github'),
  ]);

  return scanActivations({
    source: 'github',
    data: mergeScanResult({
      results: [
        scanGithubSponsors({members, activations}),
        scanGithubActivationInDatabase({members, activations}),
      ],
      getId: ({user}) => user.login,
    }),
    toPayload: async ({member}) => await toActivationPayloadFromGithub({
      data: member,
      presetLookup,
    }),
    toSendActivationActions: (payloads, sourceText) => payloads.map(async (payload) => (
      actionSendActivationEmail({
        payload: await payload,
        sourceNote: `Activation Poll (${sourceText})`,
        getWarnOnNullActivation: ({contact, email}) => `${sourceText} member is inactive for @${contact} (${email})`,
      })),
    ),
  });
};

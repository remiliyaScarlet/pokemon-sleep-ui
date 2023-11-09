import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {getAllActivationsOfSource} from '@/controller/user/activation/util';
import {actionSendActivationDiscordMessage} from '@/handler/action/activation/discord';
import {scanDiscordActivationInDatabase} from '@/handler/call/activation/poll/scan/discord/activation';
import {scanDiscordSubscribers} from '@/handler/call/activation/poll/scan/discord/member';
import {scanActivations} from '@/handler/call/activation/poll/scan/main';
import {mergeScanResult} from '@/handler/call/activation/poll/scan/utils';
import {getDiscordSubscribers} from '@/handler/shared/discord/api';
import {toActivationPayloadFromDiscord} from '@/handler/shared/discord/utils';


export const callDiscordActivationPoll = async () => {
  const [
    members,
    activations,
    presetLookup,
  ] = await Promise.all([
    getDiscordSubscribers(),
    getAllActivationsOfSource('discord'),
    getActivationPresetLookupOfSource('discord'),
  ]);

  return scanActivations({
    source: 'discord',
    data: mergeScanResult({
      results: [
        scanDiscordSubscribers({members, activations}),
        scanDiscordActivationInDatabase({members, activations}),
      ],
      getId: ({userId}) => userId,
    }),
    // Change payload
    toPayload: async ({member}) => await toActivationPayloadFromDiscord({
      member,
      presetLookup,
    }),
    toSendActivationActions: (payloads, sourceText) => [
      actionSendActivationDiscordMessage({
        payloads,
        sourceNote: `Activation Poll (${sourceText})`,
        getWarnOnNullActivation: ({contact}) => `Activation of ${contact} on ${sourceText} is null`,
      }),
    ],
  });
};

import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {removeActivationSingle, updateActivationPropertiesSingle} from '@/controller/user/activation/util';
import {toActivationPayloadFromGithub} from '@/handler/shared/github/utils';
import {ActivationContact} from '@/types/mongo/activation';
import {GithubWebhookPayload} from '@/types/subscription/github/webhook';


export const handleGithubSponsorUpdated = async (payload: GithubWebhookPayload) => {
  const presetLookup = await getActivationPresetLookupOfSource('github');

  const {contact, activationProperties} = await toActivationPayloadFromGithub({
    payload,
    presetLookup,
  });

  if (!activationProperties) {
    await removeActivationSingle({
      filter: {[`contact.${'github' satisfies ActivationContact}`]: contact},
    });
    return;
  }

  await updateActivationPropertiesSingle({
    filter: {[`contact.${'github' satisfies ActivationContact}`]: contact},
    properties: activationProperties,
  });
};

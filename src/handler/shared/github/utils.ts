import {getActivationPropertiesByContact} from '@/controller/user/activation/util';
import {ActionSendActivationPayload} from '@/handler/action/activation/type';
import {ActivationStatus} from '@/types/mongo/activation';
import {ActivationPresetLookup} from '@/types/mongo/activationPreset';
import {GithubWebhookPayload} from '@/types/subscription/github/webhook';
import {toGithubSponsorInfo} from '@/utils/external/github';
import {getActivationExpiryOfDefault} from '@/utils/user/activation/utils';


type GetActivationFromGithubSponsorOpts = {
  payload: GithubWebhookPayload,
  presetLookup: ActivationPresetLookup,
};

export const getActivationFromGithubSponsor = ({
  payload,
  presetLookup,
}: GetActivationFromGithubSponsorOpts): ActivationStatus | null => {
  const {tier, sponsor} = payload.sponsorship;
  const nodeId = tier.node_id;

  if (!sponsor) {
    console.warn(`No sponsor info available for sponsorship associated with tier ${nodeId}`);
    return null;
  }

  const activation = presetLookup[nodeId];
  if (!activation) {
    console.warn(
      `Tier ID ${nodeId} on user ${toGithubSponsorInfo(sponsor)} on Github without associated activation`,
    );
    return null;
  }

  return activation.activation;
};

export const toActivationPayloadFromGithub = async (
  opts: GetActivationFromGithubSponsorOpts,
): Promise<ActionSendActivationPayload> => {
  const {payload} = opts;
  const {sponsor} = payload.sponsorship;

  if (!sponsor) {
    throw new Error('No Github sponsor info available');
  }

  const sponsorLogin = sponsor.login.toString();
  const existedActivationProperties = (await getActivationPropertiesByContact({
    source: 'github',
    contact: sponsorLogin,
  }));

  /* eslint-disable no-console */
  console.log(`>>> Converting Github sponsor info of ${toGithubSponsorInfo(sponsor)} to activation payload`);
  if (existedActivationProperties) {
    console.log(
      `Existing activation properties of ${toGithubSponsorInfo(sponsor)} on Github:`,
      JSON.stringify(existedActivationProperties),
    );
  }
  /* eslint-enable no-console */

  const activation = getActivationFromGithubSponsor(opts);
  if (!activation) {
    return {contact: sponsorLogin, activationProperties: null};
  }

  return {
    contact: user.login,
    email,
    activationProperties: {
      expiry: (
        payload.action === 'pending_cancellation' ?
          new Date(payload.effective_date) :
          getActivationExpiryOfDefault()
      ),
      activation,
      source: 'github',
      contact: {
        ...existedActivationProperties?.contact,
        // Keep the existed ones except `github` to make sure the reference used for polling is correct
        github: sponsorLogin,
      },
      isSpecial: false,
      note: sponsor.email ? `Email: ${sponsor.email}` : '',
    },
  };
};

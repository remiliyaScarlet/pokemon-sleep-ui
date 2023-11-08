import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {
  getAllActivationsOfSource,
  removeActivationBatch,
  updateActivationPropertiesFromPayloads,
} from '@/controller/user/activation/util';
import {actionSendActivationEmail} from '@/handler/action/activation/main';
import {scanActivations} from '@/handler/call/activation/poll/scan/activation';
import {scanPatron} from '@/handler/call/activation/poll/scan/patron';
import {mergePatreonSubscriberScanResult} from '@/handler/call/activation/poll/scan/utils';
import {getCurrentCampaignMembers} from '@/handler/patreon/api/campaign/main';
import {toActivationPayloadFromPatreon} from '@/handler/patreon/utils';


export const callPatreonActivationPoll = async () => {
  const [
    memberData,
    activations,
    presetLookup,
  ] = await Promise.all([
    getCurrentCampaignMembers(),
    getAllActivationsOfSource('patreon'),
    getActivationPresetLookupOfSource('patreon'),
  ]);

  const {
    toUpdateExpiry,
    toSendActivation,
    toDeactivate,
  } = mergePatreonSubscriberScanResult(
    scanPatron({memberData, activations}),
    scanActivations({memberData, activations}),
  );

  /* eslint-disable no-console */
  console.log('>>> Patreon activation poll handling requested');
  console.log(`- Pending activations: ${toSendActivation.length}`);
  console.log(`- Pending expiry updates: ${toUpdateExpiry.length}`);
  console.log(`- Pending deactivations: ${toDeactivate.length}`);
  console.log('Pending activations:', JSON.stringify(toSendActivation));
  console.log('Pending expiry updates', JSON.stringify(toUpdateExpiry));
  console.log('Pending deactivations', JSON.stringify(toDeactivate));
  /* eslint-enable no-console */

  await Promise.all([
    // Send activations
    ...toSendActivation.map(async ({member}) => (
      actionSendActivationEmail({
        payload: await toActivationPayloadFromPatreon({member, presetLookup}),
        sourceNote: 'Patreon Activation Poll',
        getWarnOnNullActivation: ({email}) => `Patreon member is inactive for email: ${email}`,
      })),
    ),
    // Update expiry
    updateActivationPropertiesFromPayloads({
      payloads: await Promise.all(toUpdateExpiry.map(async ({member}) => (
        await toActivationPayloadFromPatreon({member, presetLookup})
      ))),
    }),
    // Remove activations
    removeActivationBatch({
      filter: {key: {$in: toDeactivate.map(({key}) => key)}},
    }),
  ]);

  /* eslint-disable no-console */
  console.log('>>> Patreon activation poll handling completed');
  /* eslint-enable no-console */

  return Response.json({}, {status: 200});
};

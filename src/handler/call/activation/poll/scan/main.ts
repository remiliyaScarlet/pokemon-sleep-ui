import {activationSourceToText} from '@/const/activation/common';
import {removeActivationBatch, updateActivationPropertiesFromPayloads} from '@/controller/user/activation/util';
import {ActionSendActivationPayload} from '@/handler/action/activation/type';
import {ActivationDeactivatePayload, ActivationPayloadConverter} from '@/handler/call/activation/poll/scan/type';
import {ActivationSource} from '@/types/mongo/activation';
import {ActivationPresetLookup} from '@/types/mongo/activationPreset';


type ScanActivationsOpts<TMember> = {
  source: ActivationSource,
  data: {
    toUpdateExpiry: TMember[],
    toSendActivation: TMember[],
    toDeactivate: ActivationDeactivatePayload<TMember>[],
  },
  toPayload: ActivationPayloadConverter<TMember>,
  toSendActivationActions: (
    payloads: Promise<ActionSendActivationPayload>[],
    sourceText: string,
  ) => Promise<void>[],
  presetLookup: ActivationPresetLookup,
};

export const scanActivations = async <TMember>({
  source,
  data,
  toPayload,
  toSendActivationActions,
  presetLookup,
}: ScanActivationsOpts<TMember>) => {
  const {
    toUpdateExpiry,
    toSendActivation,
    toDeactivate,
  } = data;

  const sourceText = activationSourceToText[source];

  /* eslint-disable no-console */
  console.log(`>>> Activation poll requested for source: ${sourceText}`);
  console.log(`- Pending activations: ${toSendActivation.length}`);
  console.log(`- Pending expiry updates: ${toUpdateExpiry.length}`);
  console.log(`- Pending deactivations: ${toDeactivate.length}`);
  console.log('Pending activations:', JSON.stringify(toSendActivation));
  console.log('Pending expiry updates', JSON.stringify(toUpdateExpiry));
  console.log('Pending deactivations', JSON.stringify(toDeactivate));
  /* eslint-enable no-console */

  await Promise.all([
    ...toSendActivationActions(
      toSendActivation.map((member) => toPayload({member, presetLookup})),
      sourceText,
    ),
    // Update expiry
    updateActivationPropertiesFromPayloads({
      source,
      payloads: await Promise.all(toUpdateExpiry.map(async (member) => (
        await toPayload({member, presetLookup})
      ))),
    }),
    // Remove activations
    removeActivationBatch({
      filter: {key: {$in: toDeactivate.map(({key}) => key)}},
    }),
  ]);

  /* eslint-disable no-console */
  console.log(`>>> Activation poll completed for source: ${sourceText}`);
  /* eslint-enable no-console */

  return Response.json({}, {status: 200});
};

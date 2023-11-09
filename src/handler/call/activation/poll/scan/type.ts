import {ActionSendActivationPayload} from '@/handler/action/activation/type';
import {ActivationPresetLookup} from '@/types/mongo/activationPreset';


export type ActivationDeactivatePayload<TMember> = {
  member: TMember,
  key: string,
};

export type ActivationScanResult<TMember> = {
  toSendActivation: TMember[],
  toUpdateExpiry: TMember[],
  toDeactivate: ActivationDeactivatePayload<TMember>[],
};

export type ActivationConverterOpts<TMember> = {
  member: TMember,
  presetLookup: ActivationPresetLookup,
};

export type ActivationPayloadConverter<TMember> = (
  opts: ActivationConverterOpts<TMember>
) => Promise<ActionSendActivationPayload>;

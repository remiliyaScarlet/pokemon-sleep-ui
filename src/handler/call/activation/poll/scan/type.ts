import {ActionSendActivationPayload} from '@/handler/action/activation/type';


export type ActivationDeactivatePayload<TMember> = {
  member: TMember | undefined,
  key: string,
};

export type ActivationScanResult<TMember> = {
  toSendActivation: TMember[],
  toUpdateExpiry: TMember[],
  toDeactivate: ActivationDeactivatePayload<TMember>[],
};

export type ActivationConverterOpts<TMember> = {
  member: TMember,
};

export type ActivationPayloadConverter<TMember> = (
  opts: ActivationConverterOpts<TMember>
) => Promise<ActionSendActivationPayload>;

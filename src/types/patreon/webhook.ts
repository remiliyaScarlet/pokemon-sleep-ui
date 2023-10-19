import {IsoUtcTimestampString} from '@/types/date';
import {PatreonChargeStatus} from '@/types/patreon/common/enum';
import {PatreonPatron} from '@/types/patreon/common/patron/main';


export type PatreonWebhookPayload = {
  data: {
    attributes: {
      access_expires_at: IsoUtcTimestampString | null,
      last_charge_status: PatreonChargeStatus,
    },
  },
  included: [
    unknown,
    PatreonPatron,
  ]
};

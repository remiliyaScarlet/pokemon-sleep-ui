import {PatreonChargeStatus} from '@/types/patreon/common/enum';
import {PatreonPatron} from '@/types/patreon/common/patron/main';


export type PatreonWebhookPayload = {
  data: {
    attributes: {
      last_charge_status: PatreonChargeStatus,
    },
  },
  included: [
    unknown,
    PatreonPatron,
  ]
};

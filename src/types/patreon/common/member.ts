import {IsoUtcTimestampString} from '@/types/date';
import {PatreonChargeStatus, PatronStatus} from '@/types/patreon/common/enum';
import {PatreonRelatedRelationship} from '@/types/patreon/common/relationship/related';


// https://docs.patreon.com/#member
export type PatreonMember = {
  type: 'member',
  id: string | null,
  attributes: {
    access_expires_at: IsoUtcTimestampString | null,
    email: string,
    last_charge_data: IsoUtcTimestampString | null,
    last_charge_status: PatreonChargeStatus,
    patron_status: PatronStatus,
  },
  relationships: {
    user: PatreonRelatedRelationship,
  },
};

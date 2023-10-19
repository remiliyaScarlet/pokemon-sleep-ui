import {PatreonMember} from '@/types/patreon/common/member';
import {PatreonResponse} from '@/types/patreon/common/response';


export type PatreonWebhookPayload = PatreonResponse<PatreonMember>;

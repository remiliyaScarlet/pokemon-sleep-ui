import {PatreonMember} from '@/types/patreon/common/member';
import {PatreonResponse} from '@/types/patreon/common/response';
import {PatreonUser} from '@/types/patreon/common/user';


export type PatreonMemberData = PatreonResponse<PatreonMember, [PatreonUser]>;

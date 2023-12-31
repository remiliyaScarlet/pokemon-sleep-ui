import {Session} from 'next-auth';


export type FilterPremiumRestrictableProps = {
  premiumOnly: true,
  session: Session | null,
} | {
  premiumOnly?: false,
  session?: never,
};

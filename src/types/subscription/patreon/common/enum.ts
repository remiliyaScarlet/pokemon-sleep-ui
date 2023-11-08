export type PatreonEventType = 'members:pledge:create' | 'members:pledge:update' | 'members:pledge:delete';

// The only successful status is Paid. `null` if never charged.
// One of `Paid`, `Declined`, `Deleted`, `Pending`, `Refunded`, `Fraud`, `Other`.
export type PatreonChargeStatus =
  'Paid' |
  'Declined' |
  'Deleted' |
  'Pending' |
  'Refunded' |
  'Fraud' |
  'Other' |
  null;

// `active_patron` when the Patron still have an active subscription
// `former_patron` when the Patron pledged but not anymore
export type PatronStatus = 'active_patron' | 'declined_patron' | 'former_patron' | null;
